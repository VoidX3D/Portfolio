const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: isGitHubPages ? '/Portfolio' : '',
  assetPrefix: isGitHubPages ? '/Portfolio/' : undefined,
}

module.exports = nextConfig
