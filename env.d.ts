/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

import {Theme} from '@sanity/ui'

declare module 'styled-components' {
  // eslint-disable-next-line
  interface DefaultTheme extends Theme {}
}
