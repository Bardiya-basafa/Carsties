const nextConfig = {
    experimental: {
        serverActions: true
    },
    experimental: {
        useLightningcss: false,
    },
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: '/public/uploads/:path*',
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.tinn.ir',
                port: '',
                pathname: '/**',

            },
            {
                protocol: 'https',
                hostname: 'content.homenetiol.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    output: 'standalone'
}

module.exports = nextConfig