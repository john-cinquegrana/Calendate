import type { Config } from 'tailwindcss';
const { heroui } = require('@heroui/theme');

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	prefix: '',
	theme: {},
	plugins: [require('tailwindcss-animate'), heroui()],
} satisfies Config;

export default config;
