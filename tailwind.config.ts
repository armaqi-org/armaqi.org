import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/charts/**/*.{js,ts,jsx,tsx,mdx}'
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
        'armaqi-base': '#15428A',
        'armaqi-border': '#9BD6F6'
      }
    },
    fontSize: {
      xs: ['12px', '20px'],
      sm: ['14px', '24px'],
      base: ['16px', '28px'],
      lg: ['18px', '32px'],
      xl: ['20px', '32px'],
      '2xl': ['24px', '36px'],
      '3xl': ['30px', '40px'],
      '4xl': ['36px', '44px'],
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant("menu-burger", ".menu-burger &");
    })
  ]
};
export default config;
