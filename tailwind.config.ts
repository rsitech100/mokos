import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			boxShadow: {
				card: '4px 4px 20px 0 rgba(203, 202, 202, 0.25)',
			},
			colors: {
				neutral: {
					'100': '#ffffff',
					'200': '#f5f5f5',
					'300': '#e9e9e9',
					'400': '#e0e0e0',
					'500': '#9c9c9c',
					'600': '#595959',
					'700': '#191717'
				},
				primary: {
					'100': '#eff8fd',
					'200': '#91a8ba',
					'300': '#6f8ca3',
					'400': '#4f728e',
					'500': '#315879',
					'600': '#294963',
					'700': '#213a4e',
					'800': '#1a2c3a',
					'900': '#141e27',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				info: {
					'100': '#e4edff',
					'200': '#95b4f8',
					'300': '#3c70e2'
				},
				warning: {
					'100': '#ffe7bb',
					'200': '#ffcb69',
					'300': '#ffab0d'
				},
				success: {
					'100': '#befed5',
					'200': '#3fc470',
					'300': '#239d50'
				},
				danger: {
					'100': '#ffdad7',
					'200': '#d62b45',
					'300': '#ae1e40'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				none: '0px',
				sm: 'calc(var(--radius) - 4px)',
				DEFAULT: '4px',
				md: 'calc(var(--radius) - 2px)',
				lg: 'var(--radius)',
				xl: '16px',
				'2xl': '20px',
				'3xl': '24px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
