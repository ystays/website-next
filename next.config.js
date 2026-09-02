/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@xterm/xterm", "@xterm/addon-fit"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'vercel.com',
        port: '',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/ystays/website-next",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
