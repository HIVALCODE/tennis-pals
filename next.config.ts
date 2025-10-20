import type { NextConfig } from "next";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "avatars";

const remotePatterns =
  SUPABASE_URL != null
    ? [
        {
          protocol: "https",
          hostname: new URL(SUPABASE_URL).hostname,
          pathname: `/storage/v1/object/public/${SUPABASE_BUCKET}/**`,
        },
      ]
    : [];

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET,
  },
  images: {
    remotePatterns,
  },
};

export default nextConfig;
