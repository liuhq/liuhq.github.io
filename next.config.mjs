import { withContentCollections } from '@content-collections/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    output: 'export',
    trailingSlash: true,
    experimental: {
        typedRoutes: true,
        optimizePackageImports: ['@remixicon/react'],
    },
}

export default withContentCollections(nextConfig)
