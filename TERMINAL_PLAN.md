# Plan: Browser SSH Terminal

## Context

Add a protected `/terminal` page to the Next.js site that opens a full xterm.js terminal in the browser, connected via WebSocket to a small proxy running on the homeserver that shells into it over SSH.

**Constraint**: The site is deployed on Vercel (serverless) — Vercel cannot host a persistent WebSocket server. The proxy must run on the homeserver itself. The browser connects directly to it.

**Auth**: Protected behind existing Google OAuth (NextAuth). Same `getServerSession` guard pattern as `/app/dashboard/page.tsx`.

---

## Architecture

```
Browser (xterm.js)
  │
  │ 1. GET /api/terminal/token  →  Vercel API route (auth check + mint short-lived JWT)
  │ ← { token }
  │
  │ 2. WebSocket to ws://10.0.0.1:3001?token=JWT
  │    ↑ WireGuard IP — only reachable if VPN is connected on this device
  │    ↑ If VPN is off → connection fails immediately (network unreachable)
  ▼
Homeserver: ws-ssh-proxy.js  (binds to WireGuard interface, e.g. 10.0.0.1:3001)
  │   validates JWT, opens SSH to localhost
  ▼
SSH shell on homeserver
```

**Why WireGuard works perfectly here:**
- No public port forwarding needed
- WireGuard encrypts traffic at the network layer, so plain `ws://` is fine (no need for `wss://`)
- The WireGuard IP is only routable if VPN is active — unreachable devices can't even attempt to connect
- JWT auth remains as a second layer (defense in depth)

---

## Packages to Install

### Next.js project
```bash
npm install @xterm/xterm @xterm/addon-fit jose
```
- `@xterm/xterm` — terminal UI
- `@xterm/addon-fit` — auto-resize to container
- `jose` — JWT signing (not currently in package.json)

### Homeserver proxy (standalone dir, e.g. `~/ws-ssh-proxy/`)
```bash
npm init -y && npm install ws ssh2 jose dotenv
```

---

## Files to Create / Modify

### New — Vercel side

| File | Purpose |
|------|---------|
| `app/terminal/page.tsx` | Server component: auth guard, renders `<Terminal>` |
| `app/api/terminal/token/route.ts` | GET: verify session, return signed JWT (5-min TTL) |
| `components/terminal/Terminal.tsx` | Client component: xterm.js + WebSocket wiring |

### Modified — Vercel side

| File | Change |
|------|--------|
| `next.config.js` | Add `transpilePackages: ["@xterm/xterm", "@xterm/addon-fit"]` |
| `app/globals.css` | Add `@import "@xterm/xterm/css/xterm.css";` after line 1 |

### New — Homeserver

| File | Purpose |
|------|---------|
| `~/ws-ssh-proxy/ws-ssh-proxy.js` | Node.js WebSocket server: validates JWT, shells in via ssh2 |
| `~/ws-ssh-proxy/.env` | Secrets and SSH config |

---

## Environment Variables

**Vercel `.env.local` (and Vercel dashboard):**
```
TERMINAL_JWT_SECRET=<min 32 random bytes — generate: openssl rand -base64 32>
NEXT_PUBLIC_TERMINAL_WS_URL=ws://10.0.0.1:3001
# ↑ use your homeserver's WireGuard IP and chosen port
# ws:// is fine — WireGuard encrypts at the network layer
```

**Homeserver `~/ws-ssh-proxy/.env`:**
```
TERMINAL_JWT_SECRET=<same value>
SSH_HOST=127.0.0.1
SSH_PORT=22
SSH_USER=youruser
SSH_PRIVATE_KEY_PATH=/home/youruser/.ssh/id_ed25519_terminal
WS_PORT=3001
WS_BIND_HOST=10.0.0.1   # ← bind ONLY to WireGuard interface, not 0.0.0.0
```

---

## Implementation Details

### `app/terminal/page.tsx`
Mirror `app/dashboard/page.tsx` exactly for the auth guard:
```ts
const session = await getServerSession(authOptions);
if (!session) redirect("/");
```
Render `<Terminal />` inside a styled wrapper. `max-w-5xl` for horizontal space.

### `app/api/terminal/token/route.ts`
- `GET` handler only
- Auth check via `getServerSession`
- Use `jose` `SignJWT` with `HS256`, 5-min expiry, a `jti` (UUID) for single-use enforcement
- Return `{ token }` JSON

### `components/terminal/Terminal.tsx`
- `"use client"` — xterm touches `document`
- **Dynamic import** `@xterm/xterm` and `@xterm/addon-fit` inside `useEffect` to avoid SSR errors
- Type-only imports at top level for TypeScript
- On mount:
  1. Fetch JWT from `/api/terminal/token` using `fetcher` from `@/lib/utils`
  2. Open WebSocket to `NEXT_PUBLIC_TERMINAL_WS_URL?token=...`
  3. Set `ws.binaryType = "arraybuffer"` — SSH output is binary
  4. Wire `term.onData` → `ws.send` (keystrokes)
  5. Wire `ws.message` → `term.write(new Uint8Array(evt.data))` (output)
  6. Send `{ type: "resize", cols, rows }` JSON on connect and `window.resize`
- Cleanup: close WS + `term.dispose()` on unmount
- UI: macOS-style traffic-light bar + dark `#0d1117` background, `h-[600px]`

### `ws-ssh-proxy.js` (homeserver)
- `WebSocketServer` on `WS_PORT`, binding to `WS_BIND_HOST` (the WireGuard IP, e.g. `10.0.0.1`) — NOT `0.0.0.0`
- Per-connection: extract `?token=`, verify JWT with `jose` `jwtVerify`
- Track `jti` in a `Set` (with `setTimeout` cleanup) for single-use enforcement
- On valid token: `ssh2` `Client.connect()` to `SSH_HOST:SSH_PORT` with private key
- `sshClient.shell({ term: "xterm-256color", cols, rows })` to open PTY
- SSH data → `ws.send(buffer)` (binary)
- WS message: if JSON with `type: "resize"` → `stream.setWindow(rows, cols, 0, 0)`; else → `stream.write(msg)` (keystrokes)
- Cleanup SSH on WS close; close WS on SSH stream close

---

## Homeserver Setup

```bash
# 1. Dedicated SSH keypair
ssh-keygen -t ed25519 -C "terminal-proxy" -f ~/.ssh/id_ed25519_terminal -N ""
cat ~/.ssh/id_ed25519_terminal.pub >> ~/.ssh/authorized_keys

# 2. Install and run proxy
mkdir ~/ws-ssh-proxy && cd ~/ws-ssh-proxy
# place ws-ssh-proxy.js and .env here
npm init -y && npm install ws ssh2 jose dotenv
node ws-ssh-proxy.js  # test — should log: Listening on ws://10.0.0.1:3001

# 3. systemd service (run as youruser)
sudo systemctl enable --now ws-ssh-proxy.service
```

**No port forwarding needed.** The proxy only listens on the WireGuard interface (`WS_BIND_HOST=10.0.0.1`). Port 3001 is invisible to the public internet. Only devices on your WireGuard VPN can reach it.

**No nginx/TLS needed.** WireGuard already encrypts all traffic on the tunnel.

---

## Verification

1. **Token route (unauthenticated)**: `curl localhost:3000/api/terminal/token` → `401 Unauthorized`
2. **Token route (authenticated)**: after sign-in, same request → `{ "token": "eyJ..." }`
3. **Proxy unit test**: mint a JWT locally with Node, connect to `ws://localhost:3001?token=...`, expect shell prompt within 1s
4. **Browser end-to-end**: visit `/terminal`, sign in, type `echo hello`, see response
5. **Auth redirect**: visit `/terminal` without session → redirects to `/`
6. **JWT replay**: send same token twice to proxy → second attempt rejected (close code 4003)
7. **Resize**: drag window, run `stty size` in terminal → cols/rows match browser

---

## Implementation Order

1. `npm install @xterm/xterm @xterm/addon-fit jose`
2. Modify `next.config.js` (transpilePackages)
3. Add xterm CSS import to `globals.css`
4. Create `app/api/terminal/token/route.ts`
5. Create `components/terminal/Terminal.tsx`
6. Create `app/terminal/page.tsx`
7. Set env vars in `.env.local`, run `npm run dev`, verify token route
8. Set up homeserver proxy + systemd
9. Set `NEXT_PUBLIC_TERMINAL_WS_URL`, test end-to-end
