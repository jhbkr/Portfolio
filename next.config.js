/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vous pouvez supprimer la configuration images.domains
  // puisque vous utilisez des images locales
};

module.exports = {
  siteUrl: "https://portfolio-karimbkr269200-gmailcoms-projects.vercel.app",
  generateRobotsTxt: true,
  experimental: {
    appDir: true,
  },
};
