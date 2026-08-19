import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Canonicalise the auto-generated Vercel deployment host onto the
        // short one. `host` matches a bare hostname — no scheme, no path.
        has: [
          {
            type: "host",
            value: "portfolio-4pwx-mfq1kw7fj-ellayee168-creates-projects.vercel.app",
          },
        ],
        source: "/:path*",
        destination: "https://portfolio-4pwx.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
