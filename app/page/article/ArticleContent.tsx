import {
  PortableText,
  PortableTextBlockComponent,
  PortableTextReactComponents,
  PortableTextTypeComponent,
} from '@portabletext/react'
import {LinkIcon} from '@sanity/icons'
import {unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {sanity} from '@sanity/react-loader/jsx'
import {Box, Card, Code, Heading} from '@sanity/ui'
import {ReactElement, useContext} from 'react'

import {ArticleCodeBlockData, ArticleData, CodeExampleData} from '~/data'
import {blocksToText} from '~/lib/blocksToText'
import {SanityBlockValue} from '~/sanity'

import {ArticleHeadingsContext} from './ArticleHeadingsContext'
import {CodeExample} from './content'
import {Paragraph} from './content/Paragraph'
import {HeadingType} from './getHeadings'

const Block: PortableTextBlockComponent = (props) => {
  const {children, value} = props
  const block = value as unknown as WrappedValue<SanityBlockValue>
  const style = unwrapData<string>(block.style)
  const headings = useContext(ArticleHeadingsContext)

  if (style === 'normal') {
    return <Paragraph>{children}</Paragraph>
  }

  if (style === 'h2') {
    const text = blocksToText([unwrapData(value as any) as unknown as SanityBlockValue])
    const heading = headings.find((t) => t.text === text)

    return (
      <Box marginTop={6} marginBottom={4} id={heading?.slug}>
        <Heading as="h2" size={2}>
          {children}
          {heading && (
            <>
              &nbsp;&nbsp;
              <a href={`#${heading.slug}`}>
                <LinkIcon />
              </a>
            </>
          )}
        </Heading>
      </Box>
    )
  }

  if (style === 'h3') {
    const text = blocksToText([unwrapData(value as any) as unknown as SanityBlockValue])
    const heading = headings.find((t) => t.text === text)

    return (
      <Box marginTop={6} marginBottom={4} id={heading?.slug}>
        <Heading as="h3" size={1}>
          {children}
          {heading && (
            <>
              &nbsp;&nbsp;
              <a href={`#${heading.slug}`}>
                <LinkIcon />
              </a>
            </>
          )}
        </Heading>
      </Box>
    )
  }

  return (
    <div>
      [{style}] {children}
    </div>
  )
}

const Span: PortableTextTypeComponent = (props) => {
  // return props.value.text.value
  return <sanity.span>{props.value.text}</sanity.span>
}

const CodeBlock: PortableTextTypeComponent = (props) => {
  const value = unwrapData<ArticleCodeBlockData>(props.value as WrappedValue<ArticleCodeBlockData>)

  return (
    <Card border marginY={5} overflow="auto" padding={3} radius={2}>
      <Code language={value?.language || undefined} size={1}>
        {value?.code}
      </Code>
    </Card>
  )
}

const Callout: PortableTextTypeComponent = (props) => {
  return (
    <Card marginY={4} overflow="auto" padding={3} radius={2} tone="critical">
      <Code size={1}>{JSON.stringify(unwrapData(props.value), null, 2)}</Code>
    </Card>
  )
}

const NpmPackageBadge: PortableTextTypeComponent = (props) => {
  return (
    <Card marginY={4} overflow="auto" padding={3} radius={2} tone="critical">
      <Code size={1}>{JSON.stringify(unwrapData(props.value), null, 2)}</Code>
    </Card>
  )
}

const CodeExampleBlock: PortableTextTypeComponent = (props) => {
  const value = unwrapData<CodeExampleData>(props.value)

  return (
    <Box marginY={4}>
      <CodeExample code={value?.code?.code || ''} />
    </Box>
    // <Card marginY={4} overflow="auto" padding={3} radius={2} tone="critical">
    //   <Code size={1}>{JSON.stringify(unwrapData(props.value), null, 2)}</Code>
    // </Card>
  )
}

const FigmaEmbed: PortableTextTypeComponent = (props) => {
  return (
    <Card marginY={4} overflow="auto" padding={3} radius={2} tone="critical">
      <Code size={1}>{JSON.stringify(unwrapData(props.value), null, 2)}</Code>
    </Card>
  )
}

const FigmaButton: PortableTextTypeComponent = (props) => {
  return (
    <Card marginY={4} overflow="auto" padding={3} radius={2} tone="critical">
      <Code size={1}>{JSON.stringify(unwrapData(props.value), null, 2)}</Code>
    </Card>
  )
}

const Image: PortableTextTypeComponent = (props) => {
  return (
    <Card marginY={4} overflow="auto" padding={3} radius={2} tone="critical">
      <Code size={1}>{JSON.stringify(unwrapData(props.value), null, 2)}</Code>
    </Card>
  )
}

const PropertyTable: PortableTextTypeComponent = (props) => {
  return (
    <Card marginY={4} overflow="auto" padding={3} radius={2} tone="critical">
      <Code size={1}>{JSON.stringify(unwrapData(props.value), null, 2)}</Code>
    </Card>
  )
}

const components: Partial<PortableTextReactComponents> = {
  block: Block,

  types: {
    callout: Callout,
    code: CodeBlock,
    codeExample: CodeExampleBlock,
    'content.figmaEmbed': FigmaEmbed,
    'content.figmaButton': FigmaButton,
    image: Image,
    npmPackageBadge: NpmPackageBadge,
    propertyTable: PropertyTable,
    span: Span,
  },
}

export function ArticleContent(props: {
  content: WrappedValue<NonNullable<ArticleData['content']>>
  headings: HeadingType[]
}): ReactElement {
  return <PortableText components={components} value={props.content} />
}
