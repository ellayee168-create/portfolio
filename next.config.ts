import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://portfolio-4pwx.vercel.app/", // ← replace this
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
