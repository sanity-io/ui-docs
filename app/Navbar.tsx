import {NavLink} from '@remix-run/react'
import {gray, white} from '@sanity/color'
import {SanityMonogram, SanityMonogramColor} from '@sanity/logos'
import {sanity} from '@sanity/react-loader/jsx'
import {Box, Button, Card, Flex, Inline, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'

import {useApp} from './useApp'

export function Navbar(): ReactElement {
  const {nav, path} = useApp()
  const {dataset, features} = useApp()

  const monogramColor: SanityMonogramColor | undefined = useMemo(
    () =>
      dataset === 'production'
        ? undefined
        : {bg1: gray['500'].hex, bg2: gray['200'].hex, fg: white.hex},
    [dataset],
  )

  return (
    <Card flex="none" padding={[3, 3, 4]}>
      <Flex gap={3}>
        <Button
          as={(linkProps) => <NavLink {...linkProps} to="/" />}
          data-as="a"
          mode="bleed"
          padding={[2, 2, 3]}
          radius={3}
        >
          <Flex align="center">
            <SanityMonogram
              aria-label="Sanity UI"
              color={monogramColor}
              style={{fontSize: 25, margin: '-7px 0 -7px -7px'}}
            />

            <Box marginLeft={3}>
              <Text weight="medium" style={{color: 'var(--card-fg-color)'}}>
                Sanity UI
              </Text>
            </Box>
          </Flex>
        </Button>

        {nav && (
          <Inline space={1}>
            {nav.children?.map((node, idx) => {
              if (node.hidden && !features.hintHiddenContent) {
                return null
              }

              return (
                <Button
                  as={(linkProps) => <NavLink {...linkProps} to={node.href} />}
                  data-as="a"
                  fontSize={2}
                  key={idx}
                  mode="bleed"
                  padding={[2, 2, 3]}
                  radius={3}
                  selected={path[0] === node.segment}
                  style={{opacity: node.hidden ? 0.25 : undefined}}
                  text={<sanity.span>{node.title}</sanity.span>}
                />
              )
            })}
          </Inline>
        )}
      </Flex>
    </Card>
  )
}
