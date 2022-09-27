import {sanity, unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Container, Flex, Heading, Stack, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'

import {ArticleData} from '~/data'

import {ArticleContent} from './ArticleContent'
import {ArticleHeadingsContext} from './ArticleHeadingsContext'
import {getHeadings} from './getHeadings'
import {getTOCTree} from './getToc'
import {HeadingsNav} from './HeadingsNav'

export function Article(props: {article: WrappedValue<ArticleData>}): ReactElement {
  const {article} = props
  const headings = useMemo(
    () => getHeadings(unwrapData(article.content) as ArticleData['content']),
    [article],
  )
  const toc = useMemo(() => getTOCTree(headings), [headings])

  return (
    <Flex>
      <Box as="aside" flex={1} style={{order: 2, maxWidth: 300}}>
        <Box padding={4}>
          {toc.length > 0 && (
            <Stack space={4}>
              <Text size={1}>On this page</Text>
              <HeadingsNav headings={toc} />
            </Stack>
          )}
        </Box>
      </Box>
      <Box as="article" flex={3} padding={[4, 5, 6]} style={{order: 1}}>
        <Container width={1}>
          <Heading as="h1" size={4}>
            <sanity.span>{article.title}</sanity.span>
          </Heading>

          <ArticleHeadingsContext.Provider value={headings}>
            {article.content && <ArticleContent content={article.content} headings={headings} />}
          </ArticleHeadingsContext.Provider>
        </Container>
      </Box>
    </Flex>
  )
}
