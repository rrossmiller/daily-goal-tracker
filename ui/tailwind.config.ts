import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'steel-blue': {
					'50': '#f3f7fb',
					'100': '#e3edf6',
					'200': '#cee1ef',
					'300': '#accde4',
					'400': '#84b3d6',
					'500': '#6799ca',
					'600': '#4b7bb9',
					'700': '#496fac',
					'800': '#405b8d',
					'900': '#374d71',
					'950': '#253146'
				}
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'dark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: 'dsy', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root' // The element that receives theme color CSS variables
	}
} satisfies Config;
