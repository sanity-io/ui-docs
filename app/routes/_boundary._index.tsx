import {json, LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {Card, Text} from '@sanity/ui'
import {ReactElement} from 'react'

import {API_DOCUMENT_TYPES, TARGET_QUERY_2, TargetData} from '~/data'
import {Layout} from '~/Layout'
import {ArticlePage, PageBuilder} from '~/page'
import {useApp} from '~/useApp'

export const loader: LoaderFunction = async () => {
  return json({
    path: [null],
  })
}

export default function IndexRoute(): ReactElement {
  const {path} = useLoaderData<typeof loader>()
  const app = useApp()
  const pageNav = app.nav?.children?.find((item) => item.segment === path[0])

  const {data, error} = app.store.useQuery<TargetData>(TARGET_QUERY_2, {
    memberTypes: API_DOCUMENT_TYPES,
    path,
  })

  if (error) {
    return (
      <Layout>
        <Card flex={1}>
          <pre>{error.message}</pre>
        </Card>
      </Layout>
    )
  }

  if (data === null) {
    return (
      <Layout>
        <Card flex={1}>
          <div>no target</div>
        </Card>
      </Layout>
    )
  }

  if (pageNav) {
    return (
      <Layout>
        <ArticlePage
          article={data?._type === 'article' ? data : undefined}
          nav={pageNav}
          path={path}
        />
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout>
        <Card flex={1} padding={[4, 4, 5]}>
          <Text muted size={1}>
            Loading…
          </Text>
        </Card>
      </Layout>
    )
  }

  if (data._type === 'article') {
    return (
      <Layout>
        <ArticlePage article={data} nav={pageNav} path={path} />
      </Layout>
    )
  }

  return (
    <Layout>
      <PageBuilder page={data} />
    </Layout>
  )
}
