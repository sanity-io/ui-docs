import {wrapData} from '@sanity/react-loader/jsx'
import {Metadata} from 'next'
import {draftMode} from 'next/headers'

import {Page, PreviewPage} from '@/components/page'
import {API_DOCUMENT_TYPES, TARGET_QUERY, TargetData} from '@/lib/data'
import {loadQuery} from '@/lib/sanity/loadQuery'

export async function generateMetadata(props: {params: {slug: string[]}}): Promise<Metadata> {
  const {params} = props

  const {data} = await loadQuery<TargetData | null>(TARGET_QUERY, {
    memberTypes: API_DOCUMENT_TYPES,
    path: params.slug,
  })

  const title = data?.title

  return {
    title: title ? `${title} | Sanity UI` : 'Sanity UI',
    description: data?.seo?.description || 'todo',
    openGraph: {
      type: data?.seo?.og?.type || 'website',
      title: data?.seo?.og?.title || data?.title || 'Sanity UI',
      description: data?.seo?.og?.description || 'todo',
      siteName: 'Sanity UI',
    },
    twitter: {
      card: data?.seo?.twitter?.cardType || 'summary',
    },
  }
}

export default async function SlugRoute(props: {params: {slug: string[]}}) {
  const {params} = props

  try {
    const {data: rawData, sourceMap} = await loadQuery<TargetData | null>(TARGET_QUERY, {
      memberTypes: API_DOCUMENT_TYPES,
      path: params.slug,
    })

    if (draftMode().isEnabled) {
      return <PreviewPage initial={{data: rawData, sourceMap}} path={params.slug} />
    }

    const data = rawData ? wrapData({baseUrl: '/studio'}, rawData, sourceMap) : null

    return <Page data={data} path={params.slug} />
  } catch (error) {
    return <Page error={error as Error} path={params.slug} />
  }
}
