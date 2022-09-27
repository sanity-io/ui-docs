import {gray, white} from '@sanity/color'
import {SanityMonogram, SanityMonogramColor} from '@sanity/logos'
import {Box, Flex, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {useDataset} from 'sanity'

export function StudioLogo(): ReactElement {
  const dataset = useDataset()

  const monogramColor: SanityMonogramColor | undefined = useMemo(
    () =>
      dataset === 'production'
        ? undefined
        : {bg1: gray['500'].hex, bg2: gray['200'].hex, fg: white.hex},
    [dataset],
  )

  return (
    <Flex align="center" padding={1}>
      <SanityMonogram color={monogramColor} style={{width: 27, height: 27}} />
      <Box padding={2}>
        <Text weight="bold">Design</Text>
      </Box>
    </Flex>
  )
}
