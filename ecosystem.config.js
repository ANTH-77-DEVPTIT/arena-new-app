require('dotenv').config()

const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  HOST,
  SCOPES,
  WEBHOOKS,
  API_VERSION,
  PORT,
  BACKEND_PORT,
  SHOP,
} = process.env

module.exports = {
  apps: [
    {
      script: 'npm',
      args: 'run serve',
      env_production: {
        NODE_ENV: 'production',
        SHOPIFY_API_KEY,
        SHOPIFY_API_SECRET,
        HOST,
        SCOPES,
        WEBHOOKS,
        API_VERSION,
        PORT,
        BACKEND_PORT,
        SHOP,
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
}
/**
 * tham khao file tu he thong dien tu
 * apps: la mot mang chua cau hinh cho quy trinh trien khai
 * deploy: la mot obj chua dung config cho qui trinh deploys app
 */
