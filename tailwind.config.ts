import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				black: '#202020',
				blacker: '#151515',
				white: '#FAF9F6',
				gray: '#E6E5E2',

				highlight: '#FBF719'
			},
			fontFamily: {
				title: ['UnifrakturCook', 'serif'],
				subtitle: ['UnifrakturMaguntia', 'serif'],
				body: ['Times New Roman', 'serif']
			},
			spacing: {
				page: '1.5rem'
			}
		}
	},

	plugins: []
} as Config;
