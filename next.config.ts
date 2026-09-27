import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Supabase Storage images are served directly on Cloudflare Workers; this
    // avoids requiring the optional Cloudflare Images optimizer binding.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;

