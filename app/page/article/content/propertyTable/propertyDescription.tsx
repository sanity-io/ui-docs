import {
  PortableText,
  PortableTextBlockComponent,
  PortableTextReactComponents,
} from '@portabletext/react'
import {unwrapData} from '@sanity/react-loader/jsx'
import {Box, BoxProps, Heading, HeadingProps, Text} from '@sanity/ui'
import {ReactElement} from 'react'

const headingProps: {
  [key: string]: {box: Omit<BoxProps, 'as'>; heading: Omit<HeadingProps, 'as'>} | undefined
} = {
  h2: {
    box: {
      paddingTop: [4, 4, 5, 6],
      paddingBottom: [2, 2, 3, 4],
    },
    heading: {size: [1, 1, 2, 3]},
  },
  h3: {
    box: {
      paddingTop: [3, 3, 4, 5],
      paddingBottom: [2, 2, 3, 4],
    },
    heading: {size: [0, 0, 1, 2]},
  },
  h4: {
    box: {
      paddingTop: [2, 2, 3, 4],
      paddingBottom: [2, 2, 3, 4],
    },
    heading: {size: [0, 0, 0, 1]},
  },
}

const BlockSerializer: PortableTextBlockComponent = (props) => {
  const value = unwrapData(props.value as any) as any
  const style = value?.style || 'normal'

  if (/^h\d/.test(style)) {
    const styleProps = headingProps[style] || {box: {}, heading: {}}

    return (
      <Box {...styleProps.box}>
        <Heading as={style as any} {...styleProps.heading}>
          {props.children as any}
        </Heading>
      </Box>
    )
  }

  if (style === 'blockquote') {
    return (
      <Box as="blockquote" paddingY={4}>
        <Text muted size={[2, 2, 3, 4]}>
          {props.children as any}
        </Text>
      </Box>
    )
  }

  return (
    <Box paddingY={4}>
      <Text muted size={[2, 2, 3, 4]}>
        {props.children as any}
      </Text>
    </Box>
  )
}

const serializers: Partial<PortableTextReactComponents> = {
  block: BlockSerializer,
}

export function PropertyDescription({blocks}: {blocks: unknown[]}): ReactElement {
  return <PortableText value={blocks as any} components={serializers} />
}
