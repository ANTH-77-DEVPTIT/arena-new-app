import axios from 'axios'
import { getSessionToken } from '@shopify/app-bridge-utils'
import { createApp } from '@shopify/app-bridge'

const apiCaller = async (endpoint, method = 'GET', data = undefined, extraHeaders = undefined) => {
  try {
    let token = await getSessionToken(createApp(window.SHOPIFY_APP))
    console.log('🚀 ~ file: apiCaller.js ~ token', token)
    //cái token nay nó lấy ra và kèm theo vào authrizatio bên trong headers
    //để frontend thao tác được với be thì khi axios gửi đi phải kèm them thằng này.(JWT)

    let axiosConfig = {
      url: window.BACKEND_URL + endpoint,
      method: method || 'GET',
      data: data || undefined,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(extraHeaders ? extraHeaders : {}),
      },
    }

    const res = await axios(axiosConfig)

    return res.data
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message ? error.response.data : error.message,
    }
  }
}

export default apiCaller
