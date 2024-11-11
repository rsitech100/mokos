import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'card': '4px 4px 20px 0 rgba(203, 202, 202, 0.25)',
      },
      colors: {
        neutral: {
          700: '#191717',
          600: '#595959',
          500: '#9c9c9c',
          400: '#e0e0e0',
          300: '#e9e9e9',
          200: '#f5f5f5',
          100: '#ffffff',
        },
        primary: {
          900: '#141e27',
          800: '#1a2c3a',
          700: '#213a4e',
          600: '#294963',
          500: '#315879',
          400: '#4f728e',
          300: '#6f8ca3',
          200: '#91a8ba',
          100: '#eff8fd',
        },
        info: {
          300: '#3c70e2',
          200: '#95b4f8',
          100: '#e4edff',
        },
        warning: {
          300: '#ffab0d',
          200: '#ffcb69',
          100: '#ffe7bb',
        },
        success: {
          300: '#239d50',
          200: '#3fc470',
          100: '#befed5',
        },
        danger: {
          300: '#ae1e40',
          200: '#d62b45',
          100: '#ffdad7',
        },
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};
export default config;
