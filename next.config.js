/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ik.imagekit.io',
				pathname: '/v6rcwgkcr/**'
			}
		]
	}
};

module.exports = nextConfig;
