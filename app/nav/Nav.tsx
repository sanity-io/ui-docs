import {NavLink} from '@remix-run/react'
import {sanity} from '@sanity/react-loader/jsx'
import {Card, Stack, Text} from '@sanity/ui'
import {getTheme_v2} from '@sanity/ui/theme'
import {ReactElement} from 'react'
import {styled} from 'styled-components'

import {useApp} from '~/useApp'

import {NavNode} from './parseNav'

export function Nav(props: {nav: NavNode; path: string}): ReactElement {
  const {nav, path} = props

  return (
    <Stack space={1}>
      {nav.children?.map((node, idx) => (
        <NavMenuItem key={idx} level={1} node={node} path={path} />
      ))}
    </Stack>
  )
}

const NodeCard = styled(Card)<{$level: number}>`
  padding-left: ${({$level, theme}) => getTheme_v2(theme).space[2] * $level}px;
  text-decoration: none;
`

function NavMenuItem(props: {level: number; node: NavNode; path: string}) {
  const {level, node, path} = props
  const {features} = useApp()

  if (node.hidden && !features.hintHiddenContent) {
    return null
  }

  return (
    <>
      <NodeCard
        $level={level}
        forwardedAs={(linkProps) => <NavLink {...linkProps} to={node.href} />}
        data-as="a"
        // hidden={!expanded}
        padding={2}
        radius={2}
        selected={path === node.href}
        tone="inherit"
      >
        <Text
          muted={!node.targetId}
          size={1}
          style={{opacity: node.hidden ? 0.2 : undefined}}
          weight="medium"
        >
          {node.title ? <sanity.span>{node.title}</sanity.span> : <em>Untitled</em>}
        </Text>
      </NodeCard>

      {node.children?.map((child, idx) => (
        <NavMenuItem key={idx} level={level + 1} node={child} path={path} />
      ))}
    </>
  )
}
