import validateParams from '../helpers/validateParams.js'
import apiCaller from '../helpers/apiCaller.js'

const count = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({ shop, accessToken, endpoint: `products/count.json` })
  } catch (error) {
    throw error
  }
}

const ProductMiddleware = {
  count,
}

export default ProductMiddleware
