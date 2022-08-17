import { useEffect, useState } from 'react'
import StoreSettingApi from './apis/store_setting'
import { useSelector, useDispatch } from 'react-redux'
import { selectNotify, showNotify } from './redux/reducers/notify'
import { selectAppLoading } from './redux/reducers/appLoading'
import { selectStoreSetting, setStoreSetting } from './redux/reducers/storeSetting'
import { NavigationMenu, Toast } from '@shopify/app-bridge-react'
import Preloader from './components/Preloader'
import Privacy from './components/Privacy'

function AppContainer(props) {
  const { actions, children, storeSetting } = props

  const [isReady, setIsReady] = useState(false)

  const getStoreSetting = async () => {
    try {
      let res = await StoreSettingApi.auth()
      if (!res.success) {
        throw res.error
      }

      // check session expired
      if (res.data.status !== 'RUNNING') {
        return window.top.location.replace(`${window.HOST}/api/auth?shop=${window.shopOrigin}`)
      }

      actions.setStoreSetting(res.data)
    } catch (error) {
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getStoreSetting()
  }, [])

  useEffect(() => {
    console.log('---------------------------------------')
    console.log('Redux:')
    Object.keys(props)
      .filter((key) => key !== 'children')
      .forEach((key) => console.log('| ' + key + ' :>> ', props[key]))

    if (!isReady && storeSetting) {
      setIsReady(true)
    }
  }, [storeSetting])

  const acceptPrivacy = async () => {
    try {
      let res = await StoreSettingApi.update({ acceptedAt: new Date().toISOString() })
      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: 'Privacy accepted' })
      actions.setStoreSetting(res.data)
    } catch (error) {
      actions.showNotify({ message: error.message, error: true })
    }
  }

  if (!isReady) {
    return <Preloader />
  }

  /**
   * App đầu tiên gọi đến api storeSetting:
   * Tương ứng với mỗi path truyền từ AppContainer xuống
   * nó sẽ tìm vào một pages thích hợp
   * - Nhưng trước tiên nó phải check xem accessToken trong storeSetting có tích hợp chưa, Đó là một mã cố định
   * - accessToken đúng nó sẽ gọi đến BE thực hiện
   * - BE phải dựa vào một AppToken(token này thay đối mỗi khi page re-render) để gọi đến Shopify admin api để lấy dữ liệu trả về cho FE
   *
   */
  return <div>{storeSetting?.acceptedAt ? children : <Privacy onAction={acceptPrivacy} />}</div>
}

export default AppContainer
