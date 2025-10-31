const nextConfig = {
    experimental: {
        serverActions: true
    },
   
    images: {
        unoptimized: true,
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