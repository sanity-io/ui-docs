import {wrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Metadata} from 'next'
import {PropsWithChildren} from 'react'

import {GLOBAL_QUERY, GlobalData} from '@/lib/data'
import {loadQuery} from '@/lib/sanity/loadQuery'

import {RootLayout} from './RootLayout'

export const metadata: Metadata = {
  title: 'Sanity UI',
  // description: '...',
  icons: {
    icon: '/sanity-favicon-48.png',
    shortcut: '/sanity-favicon-32.png',
    apple: '/sanity-favicon-57.png',
  },
  twitter: {
    site: '@sanity_io',
  },
}

export default async function RootLayoutLoader(props: PropsWithChildren) {
  const {data: rawData, sourceMap} = await loadQuery<GlobalData>(GLOBAL_QUERY)
  const data: WrappedValue<GlobalData> = wrapData({baseUrl: '/studio'}, rawData, sourceMap)

  return (
    <RootLayout
      {...props}
      data={data}
      dataset={process.env.SANITY_DATASET!}
      hintHiddenContent={process.env.APP_FEATURE_HINT_HIDDEN_CONTENT === 'true'}
      projectId={process.env.SANITY_PROJECT_ID!}
      studioOrigin={process.env.SANITY_STUDIO_ORIGIN}
    />
  )
}
