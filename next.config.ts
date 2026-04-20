import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tokusho",
        destination: "/legal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
