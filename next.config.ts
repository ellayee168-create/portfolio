import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Only redirect when visiting the wrong domain
        has: [
          {
            type: "host",
            value: "https://portfolio-4pwx-mfq1kw7fj-ellayee168-creates-projects.vercel.app/",
          },
        ],
        source: "/:path*",
        destination: "https://portfolio-4pwx.vercel.app/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
