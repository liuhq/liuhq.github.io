import { withContentCollections } from '@content-collections/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    output: 'export',
    trailingSlash: true,
    experimental: {
        typedRoutes: true,
    },
}

export default withContentCollections(nextConfig)
