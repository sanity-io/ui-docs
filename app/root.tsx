import './global.css'

import {json, LoaderFunction, MetaFunction} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import {ThemeColorSchemeKey, ThemeProvider, ToastProvider, usePrefersDark} from '@sanity/ui'
import {defaultTheme, getTheme_v2} from '@sanity/ui/theme'
import {lazy, ReactElement, useEffect, useMemo, useState} from 'react'
import {createGlobalStyle} from 'styled-components'

import {AppContext, AppContextValue} from './AppContext'
import {GLOBAL_QUERY, GlobalData} from './data'
import {parseNav} from './nav'
import {createQueryStore, getClient} from './sanity'
import {getImageUrlBuilder} from './sanity/image'

const VisualEditing = lazy(() => import('./VisualEditing'))

export const meta: MetaFunction = () => [{title: 'Sanity Design'}]

export const loader: LoaderFunction = async ({request}) => {
  const {getSession} = await import('./session')

  const session = await getSession(request.headers.get('Cookie'))
  const preview = session.get('preview')

  const dataset = process.env.SANITY_DATASET || 'development'
  const projectId = process.env.SANITY_PROJECT_ID || 'mos42crl'
  const studioOrigin = process.env.SANITY_STUDIO_ORIGIN || 'http://localhost:3000'

  return json({
    basePath: process.env.APP_BASE_PATH,
    dataset,
    features: {
      hintHiddenContent: process.env.APP_FEATURE_HINT_HIDDEN_CONTENT === 'true',
    },
    preview,
    projectId,
    studioOrigin,
    token: preview ? process.env.SANITY_API_READ_TOKEN : undefined,
  })
}

const GlobalStyle = createGlobalStyle((props) => {
  const {color, font} = getTheme_v2(props.theme)
  const textSize = font.text.sizes[2]

  return {
    html: {
      font: `100%/${textSize.lineHeight / textSize.fontSize} ${font.text.family}`,
    },

    body: {
      backgroundColor: color.bg,
    },

    a: {
      textDecoration: 'none',
    },
  }
})

export default function App(): ReactElement {
  const {basePath, dataset, features, preview, projectId, studioOrigin, token} =
    useLoaderData<typeof loader>()
  const loc = useLocation()
  const path = useMemo(() => loc.pathname.split('/').filter(Boolean), [loc.pathname])

  const prefersDark = usePrefersDark()
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>('light')

  const client = useMemo(() => getClient({dataset, projectId, token}), [dataset, projectId, token])
  const {imageUrlBuilder, urlForImage} = useMemo(
    () => getImageUrlBuilder({dataset, projectId}),
    [dataset, projectId],
  )
  const [store] = useState(() =>
    createQueryStore({
      baseUrl: studioOrigin + '/studio',
      client,
    }),
  )
  const {data} = store.useQuery<GlobalData>(GLOBAL_QUERY)
  const {nav: navNode = null, settings = null} = data || {}
  const nav = useMemo(() => navNode && parseNav(navNode, []), [navNode])

  const app: AppContextValue = useMemo(
    () => ({
      basePath,
      client,
      colorScheme: scheme,
      dataset,
      features,
      imageUrlBuilder,
      nav,
      path,
      projectId,
      setColorScheme: setScheme,
      settings,
      store,
      urlForImage,
    }),
    [
      basePath,
      client,
      dataset,
      features,
      imageUrlBuilder,
      nav,
      path,
      projectId,
      scheme,
      settings,
      store,
      urlForImage,
    ],
  )

  useEffect(() => setScheme(prefersDark ? 'dark' : 'light'), [prefersDark])

  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <AppContext.Provider value={app}>
          <ThemeProvider scheme={scheme} theme={defaultTheme}>
            <GlobalStyle />
            <ToastProvider>
              <Outlet />
            </ToastProvider>
          </ThemeProvider>
          {preview && <VisualEditing allowStudioOrigin={studioOrigin} />}
        </AppContext.Provider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
