import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  Button,
} from '@shopify/polaris'
import { TitleBar } from '@shopify/app-bridge-react'

import { trophyImage } from '../assets'

import { ProductsCard } from '../components'

import SubmitionApi from '../apis/submition'

import ProductsPage from './products'
import PlansPage from './plans'
import HistoryActionsPage from './history-actions'

export default function HomePage(props) {
  const { actions } = props

  if (true) {
    // return <ProductsPage {...props} />
    // return <PlansPage {...props} />
    // return <HistoryActionsPage {...props} />
  }

  const handleSubmit = async () => {
    try {
      actions.showAppLoading()

      let res = await SubmitionApi.submit()
      console.log('SubmitionApi res :>> ', res)
      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: 'Submition successful!' })
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  return (
    <Page narrowWidth>
      {/* <TitleBar title="App name" primaryAction={null} /> */}
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack wrap={false} spacing="extraTight" distribution="trailing" alignment="center">
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Nice work on building a Shopify app 🎉</Heading>
                  <p>
                    Your app is ready to explore! It contains everything you need to get started
                    including the{' '}
                    <Link url="https://polaris.shopify.com/" external>
                      Polaris design system
                    </Link>
                    ,{' '}
                    <Link url="https://shopify.dev/api/admin-graphql" external>
                      Shopify Admin API
                    </Link>
                    , and{' '}
                    <Link url="https://shopify.dev/apps/tools/app-bridge" external>
                      App Bridge
                    </Link>{' '}
                    UI library and components.
                  </p>
                  <p>
                    Ready to go? Start populating your app with some sample products to view and
                    test in your store.{' '}
                  </p>
                  <p>
                    Learn more about building out your app in{' '}
                    <Link url="https://shopify.dev/apps/getting-started/add-functionality" external>
                      this Shopify tutorial
                    </Link>{' '}
                    📚{' '}
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: '0 20px' }}>
                  <Image
                    source={trophyImage}
                    alt="Nice work on building a Shopify app"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <ProductsCard {...props} />
        </Layout.Section>
        <Layout.Section>
          <Button onClick={handleSubmit}>Submit test</Button>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
