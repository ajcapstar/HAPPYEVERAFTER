/** @type {import('next').NextConfig} */

const nextConfig = {
  reactCompiler: true,

  // This tells Next.js these components need client-side rendering
  transpilePackages: ["gsap", "@gsap/react"],

  images: {
    unoptimized: false,
  },
};

export default nextConfig;
