/**
 * Static export.
 *
 * GitHub Pages serves a project repo at /<repo>/, so every asset path needs a
 * basePath or the CSS and fonts 404. The Actions workflow sets PAGES_BASE_PATH.
 * A custom domain or Vercel deploy leaves it unset and serves from root.
 *
 * @type {import('next').NextConfig}
 */
const basePath = process.env.PAGES_BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
