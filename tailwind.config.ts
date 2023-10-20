import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontSize: {
			'font-small': ['0.875rem', {
				fontWeight: '400',
				lineHeight: '150%',
			}],
			'font-medium': ['1rem', {
				fontWeight: '400',
				lineHeight: '150%',
			}],
			'font-large': ['1.125rem', {
				fontWeight: '400',
				lineHeight: '150%',
			}]
		},
		colors: {
			'brand-red': '#D73035',
			'brand-red-dark': '#8A1114',
			'brand-red-light': '#FFABAD',
			'gray-500': '#333333',
			'gray-400': '#666666',
			'gray-300': '#999999',
			'gray-200': '#CCCCCC',
			'gray-100': '#F2F2F2',
			'white': '#FFFFFF',
		}
	},
	plugins: [],
};
export default config;
