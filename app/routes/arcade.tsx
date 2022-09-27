import {json, LoaderFunction, MetaFunction} from '@remix-run/node'
import {createElement, lazy, ReactElement, Suspense, useEffect, useState} from 'react'

import {Layout} from '~/Layout'

export const loader: LoaderFunction = ({request}) => {
  const url = new URL(request.url)

  return json({
    title: url.searchParams.get('title'),
    description: url.searchParams.get('description'),
  })
}

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {
    title: `${data.title || 'Arcade'} – Sanity Design`,
  },
  {
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    property: 'og:type',
    content: 'website',
  },
  {
    property: 'og:title',
    content: data.title || 'Untitled',
  },
  {
    property: 'og:description',
    content: data.description || 'An interactive JSX playground for Sanity UI.',
  },
]

export default function ArcadeRoute(): ReactElement {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  return (
    <Layout>
      <Suspense>{createElement(lazy(() => import('~/arcade/default')))}</Suspense>
    </Layout>
  )
}
