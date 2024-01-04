const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
    reactStrictMode: false,
});

module.exports = nextConfig; 
