import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    allowedDevOrigins: ['10.171.182.140','10.39.1.156','10.17.221.140'],
    experimental: {
            serverActions: {
            bodySizeLimit: "5mb",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

