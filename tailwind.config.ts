import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'armaqi-pink': '#77C2EB',
        'armaqi-base': '#15428A'
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant("menu-top", ".menu-top &");
      addVariant("menu-burger", ".menu-burger &");
    })
  ]
};
export default config;
