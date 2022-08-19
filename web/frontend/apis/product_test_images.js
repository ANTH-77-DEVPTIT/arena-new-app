import apiCaller from '../helpers/apiCaller'

const count = async (product_id) => {
  return await apiCaller(`/api/products/${product_id}/images/count`, { product_id: product_id })
}

const find = async (product_id) => {
  return await apiCaller(`/api/products/${product_id}/images`, { product_id: product_id })
}

const create = async (product_id, images) => {
  const formData = new FormData()

  images.forEach((item) => formData.append('images', item))

  return await apiCaller(`/api/products/${product_id}/images`, 'POST', formData)
}

const update = async (product_id, data) => {
  // return await apiCaller(`/api/products/${product_id}/images`, 'PUT', data)
}

const _delete = async (product_id) => {
  return await apiCaller(`/api/products/${product_id}/images`, 'DELETE', { product_id: product_id })
}

const ProductImageApi = {
  count,
  find,
  create,
  update,
  delete: _delete,
}

export default ProductImageApi
