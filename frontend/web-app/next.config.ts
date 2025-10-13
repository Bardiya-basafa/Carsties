import type {NextConfig} from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    images: {
        domains: ['cdn.pixabay.com'],
        // Or use remotePatterns (recommended):
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
            },
        ],
    },
    output: 'standalone'
};

export default withFlowbiteReact(nextConfig);