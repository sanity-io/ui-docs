import {SanityClient} from '@sanity/client'
import {SanityStegaClient} from '@sanity/client/stega'
import {ImageUrlBuilder} from '@sanity/image-url/lib/types/builder'
import {SanityImageSource} from '@sanity/image-url/lib/types/types'
import {WrappedValue} from '@sanity/react-loader/jsx'
import {ThemeColorSchemeKey} from '@sanity/ui'
import {createContext, Dispatch, SetStateAction} from 'react'

import {SettingsData} from './data'
import {NavNode} from './nav'
import {SanityQueryStore} from './sanity'

export interface AppContextValue {
  basePath?: string
  client: SanityClient | SanityStegaClient
  colorScheme: ThemeColorSchemeKey
  dataset: string
  features: {
    hintHiddenContent: boolean
  }
  imageUrlBuilder: ImageUrlBuilder
  nav: NavNode | null
  path: string[]
  projectId: string
  setColorScheme: Dispatch<SetStateAction<ThemeColorSchemeKey>>
  settings: WrappedValue<SettingsData> | null
  store: SanityQueryStore
  urlForImage: (source: SanityImageSource) => ImageUrlBuilder
}

export const AppContext = createContext<AppContextValue | null>(null)
