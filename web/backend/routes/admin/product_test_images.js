import verifyToken from '../../auth/verifyToken.js'
import ResponseHandler from '../../helpers/responseHandler.js'
import ProductMiddlewareImage from '../../middlewares/product_image.js'
import MulterUpload from '../../connector/multer/index.js'

export default function productRouteImage(app, Shopify) {
  //count
  app.get('/api/products/:product_id/images/count', async (req, res) => {
    try {
      const session = await verifyToken(req, res, app, Shopify)
      const { shop, accessToken } = session

      const { product_id } = req.params
      console.log('keo chua')

      const data = await ProductMiddlewareImage.count({ shop, accessToken, product_id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  }),
    //getAll
    app.get('/api/products/:product_id/images', async (req, res) => {
      try {
        const session = await verifyToken(req, res, app, Shopify)
        const { shop, accessToken } = session

        const { product_id } = req.params

        const data = await ProductMiddlewareImage.count({ shop, accessToken, product_id })

        return ResponseHandler.success(res, data)
      } catch (error) {
        return ResponseHandler.error(res, error)
      }
    }),
    //create
    app.post(
      '/api/products/:product_id/images',
      MulterUpload.array('images', 250),
      async (req, res) => {
        try {
          const session = await verifyToken(req, res, app, Shopify)
          const { product_id } = req.params
          const { shop, accessToken } = session

          const data = await ProductMiddlewareImage.create({
            shop,
            accessToken,
            data: req.files,
            product_id,
          })

          return ResponseHandler.success(res, data)
        } catch (error) {
          return ResponseHandler.error(res, error)
        }
      },
    )

  app.put('/api/products/:product_id/images', async (req, res) => {
    try {
      const session = await verifyToken(req, res, app, Shopify)
      const { shop, accessToken } = session

      const { product_id } = req.params

      const data = await ProductMiddlewareImage.update({
        shop,
        accessToken,
        product_id,
        data: req.body,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  })

  app.delete('/api/products/:product_id/images', async (req, res) => {
    try {
      const session = await verifyToken(req, res, app, Shopify)
      const { shop, accessToken } = session

      const { product_id } = req.params

      const data = await ProductMiddlewareImage.delete({ shop, accessToken, product_id })

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  })
}
