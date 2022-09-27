import {WrappedValue} from '@sanity/react-loader/jsx'
import {Code} from '@sanity/ui'
import {ReactElement} from 'react'

import {ScreenData} from '~/data'

import {HeroSection} from './sections/HeroSection'

export function PageBuilder(props: {page: WrappedValue<ScreenData>}): ReactElement {
  const {page} = props

  return (
    <>
      {page.sections?.map((section) => {
        if (section._type === 'screenSection.hero') {
          return <HeroSection data={section} key={section._key} />
        }

        return (
          <div key={section._key}>
            <Code>{JSON.stringify(section, null, 2)}</Code>
          </div>
        )
      })}
    </>
  )
}
