import {ContentSourceMap, QueryParams, SanityClient} from '@sanity/client'
import {SanityStegaClient} from '@sanity/client/stega'
import {createQueryStore as _createQueryStore, UseLiveModeHook} from '@sanity/react-loader'
import {wrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {useMemo} from 'react'

type UseQueryHook = <T>(
  query: string,
  params?: QueryParams,
) => {
  data: WrappedValue<T> | undefined
  error: Error | undefined
  loading: boolean
  rawData: T | undefined
  sourceMap: ContentSourceMap | undefined
}

export interface SanityQueryStore {
  useQuery: UseQueryHook
  useLiveMode: UseLiveModeHook
}

export function createQueryStore(options: {
  baseUrl: string
  client: SanityClient | SanityStegaClient
}): SanityQueryStore {
  const {baseUrl, client} = options

  const {useQuery: _useQuery, useLiveMode} = _createQueryStore({client})

  const context = {baseUrl}

  function useQuery<T>(query: string, params?: QueryParams) {
    const {data: rawData, error, loading, sourceMap} = _useQuery<T>(query, params)

    const data = useMemo(
      () => (loading || error ? undefined : wrapData(context, rawData, sourceMap)),
      [error, loading, rawData, sourceMap],
    )

    return {
      data,
      error,
      loading,
      rawData,
      sourceMap,
    }
  }

  return {
    useQuery: useQuery as SanityQueryStore['useQuery'],
    useLiveMode,
  }
}
