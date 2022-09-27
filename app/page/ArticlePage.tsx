import {WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Card, Flex} from '@sanity/ui'
import {ReactElement} from 'react'

import {ArticleData} from '~/data'
import {Nav, NavNode} from '~/nav'

import {Article} from './article'

export function ArticlePage(props: {
  article?: WrappedValue<ArticleData>
  nav?: NavNode
  path: string[]
}): ReactElement {
  const {article, nav, path} = props

  return (
    <Card flex={1} style={{minHeight: 'auto'}}>
      <Flex>
        {nav && (
          <Card
            flex={1}
            overflow="auto"
            style={{maxWidth: 300, height: '100vh', position: 'sticky', top: 0}}
          >
            <Box padding={[3, 3, 4]}>
              <Box padding={[0, 0, 1]}>
                <Nav nav={nav} path={`/${path.join('/')}`} />
              </Box>
            </Box>
          </Card>
        )}

        <Box flex={3}>{article && <Article article={article} />}</Box>
      </Flex>
    </Card>
  )
}
