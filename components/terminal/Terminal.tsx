"use client";

import { useEffect, useRef, useCallback } from "react";
import { fetcher } from "@/lib/utils";

import type { Terminal as XTermTerminal } from "@xterm/xterm";
import type { FitAddon as XTermFitAddon } from "@xterm/addon-fit";

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTermTerminal | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const fitAddonRef = useRef<XTermFitAddon | null>(null);

  const handleResize = useCallback(() => {
    fitAddonRef.current?.fit();
    const term = xtermRef.current;
    const ws = wsRef.current;
    if (term && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({ type: "resize", cols: term.cols, rows: term.rows }),
      );
    }
  }, []);

  useEffect(() => {
    if (!terminalRef.current) return;

    let cancelled = false;

    async function init() {
      const { Terminal: XTerm } = await import("@xterm/xterm");
      const { FitAddon } = await import("@xterm/addon-fit");

      if (cancelled) return;

      const term = new XTerm({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: '"Cascadia Code", "Fira Code", monospace',
        theme: {
          background: "#0d1117",
          foreground: "#c9d1d9",
          cursor: "#58a6ff",
          selectionBackground: "#264f78",
          black: "#484f58",
          red: "#ff7b72",
          green: "#3fb950",
          yellow: "#d29922",
          blue: "#58a6ff",
          magenta: "#bc8cff",
          cyan: "#39c5cf",
          white: "#b1bac4",
          brightBlack: "#6e7681",
          brightRed: "#ffa198",
          brightGreen: "#56d364",
          brightYellow: "#e3b341",
          brightBlue: "#79c0ff",
          brightMagenta: "#d2a8ff",
          brightCyan: "#56d4dd",
          brightWhite: "#f0f6fc",
        },
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      xtermRef.current = term;
      fitAddonRef.current = fitAddon;

      term.open(terminalRef.current!);
      fitAddon.fit();

      term.write(`\r\nConnecting to ${process.env.NEXT_PUBLIC_TERMINAL_WS_URL}...\r\n`);

      let tokenData: { token: string };
      try {
        tokenData = await fetcher<{ token: string }>("/api/terminal/token");
      } catch (err: any) {
        term.write(`\r\nFailed to obtain token: ${err.message}\r\n`);
        return;
      }

      if (cancelled) return;

      const wsUrl = process.env.NEXT_PUBLIC_TERMINAL_WS_URL;
      if (!wsUrl) {
        term.write(
          "\r\nNEXT_PUBLIC_TERMINAL_WS_URL is not configured.\r\n",
        );
        return;
      }

      const ws = new WebSocket(`${wsUrl}?token=${tokenData.token}`);
      wsRef.current = ws;
      ws.binaryType = "arraybuffer";

      ws.addEventListener("open", () => {
        term.write("\r\nConnected.\r\n");
        fitAddon.fit();
        ws.send(
          JSON.stringify({ type: "resize", cols: term.cols, rows: term.rows }),
        );
      });

      ws.addEventListener("message", (evt) => {
        if (typeof evt.data === "string") return;
        term.write(new Uint8Array(evt.data));
      });

      ws.addEventListener("close", (evt) => {
        term.write(`\r\n\r\nConnection closed (${evt.code}).\r\n`);
      });

      ws.addEventListener("error", () => {
        term.write(
          "\r\nWebSocket error. Check VPN is connected and proxy is running.\r\n",
        );
      });

      term.onData((data) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data);
        }
      });

      window.addEventListener("resize", handleResize);
    }

    init();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      wsRef.current?.close();
      xtermRef.current?.dispose();
      xtermRef.current = null;
      wsRef.current = null;
      fitAddonRef.current = null;
    };
  }, [handleResize]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-700 bg-[#0d1117] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-gray-700 bg-[#161b22] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-3 font-mono text-xs text-gray-400">
          homeserver — ssh
        </span>
      </div>
      <div ref={terminalRef} className="h-[600px] w-full p-1" />
    </div>
  );
}
