/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'waiterapp-dev-uploadimages-tvdslzrah1vy.s3.amazonaws.com',
				pathname: '/**'
			}
		]
	}
};

module.exports = nextConfig;
