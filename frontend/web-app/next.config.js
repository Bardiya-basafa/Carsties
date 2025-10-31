const nextConfig = {
    experimental: {
        serverActions: true
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
    images: {
        unoptimized: true, // Important for Docker deployments
    },
    output: 'standalone'
}

module.exports = nextConfig