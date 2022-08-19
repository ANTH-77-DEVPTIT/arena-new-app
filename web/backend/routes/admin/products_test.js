import verifyToken from '../../auth/verifyToken.js'
import ResponseHandler from '../../helpers/responseHandler.js'
import ProductMiddleware from '../../middlewares/products_test.js'

export default function productRouteTest(app, Shopify) {
  app.get('/api/products/count', async (req, res) => {
    try {
      const session = verifyToken(req, res, app, Shopify)
      const { shop, accessToken } = session
      console.log('session :>> ', session)

      const data = await ProductMiddleware.count({ shop, accessToken })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  })
}
