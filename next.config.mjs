/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Specify the path to your pages directory
  pageExtensions: ["ts", "tsx"], // Ensures that only .ts and .tsx files are treated as pages
  experimental: {
    appDir: true, // Optional: enable experimental app directory feature
  },
};

export default nextConfig;
