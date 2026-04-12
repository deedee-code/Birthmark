/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    maximumDiskCacheSize: 1073741824, // 1GB safety limit
  },
}

export default nextConfig
