import StoreSettingMiddleware from '../../middlewares/store_setting.js'

export default function webhookRoute(app, Shopify) {
  app.post('/api/webhooks', async (req, res) => {
    try {
      const domain = req.headers['x-shopify-shop-domain']
      const topic = req.headers['x-shopify-topic']
      const { id } = req.body

      // console.log(`🚀 ~ webhook ${domain} ${topic} ${id}`)

      switch (topic) {
        case 'app/uninstalled':
          StoreSettingMiddleware.getByShop(domain).then((res) => {
            StoreSettingMiddleware.update(res.id, {
              status: StoreSettingMiddleware.STATUS.UNINSTALLED,
              appPlan: StoreSettingMiddleware.APP_PLAN.BASIC,
              acceptedAt: null,
              billings: null,
            })
          })
          break

        case 'shop/update':
          break

        default:
          break
      }

      await Shopify.Webhooks.Registry.process(req, res)
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`)
    } finally {
      res.status(200)
    }
  })
}
