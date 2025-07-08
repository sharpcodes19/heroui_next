/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: "http://127.0.0.1:3333",
    AUTH_TOKEN_SECRET: "sk_SampleApp",
    AUTH_TOKEN_KEY: "SampleToken",
    CURRENCY: "PHP",
    LOCALE: "en-PH",
    APP_TIMEZONE: "Asia/Manila",
  },
}

module.exports = nextConfig
