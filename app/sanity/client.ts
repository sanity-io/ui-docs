import {createClient, SanityClient} from '@sanity/client'

export function getClient(options: {
  projectId: string
  dataset: string
  token?: string
}): SanityClient {
  return createClient({
    ...options,
    apiVersion: '2023-11-01',
    ignoreBrowserTokenWarning: true,
    perspective: 'published',
    resultSourceMap: options.token ? 'withKeyArraySelector' : undefined,
    useCdn: true,
  })
}
