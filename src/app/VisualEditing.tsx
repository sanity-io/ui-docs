'use client'

import {createClient} from '@sanity/client'
import {enableOverlays, HistoryAdapter, HistoryAdapterNavigate} from '@sanity/overlays'
import {useLiveMode} from '@sanity/react-loader'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useMemo, useRef, useState} from 'react'

export function VisualEditing(props: {dataset: string; projectId: string; studioOrigin: string}) {
  const {dataset, projectId, studioOrigin} = props

  const client = useMemo(
    () =>
      createClient({
        dataset,
        projectId,
        useCdn: true,
        apiVersion: '2023-12-01',
      }),
    [dataset, projectId],
  )

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const routerRef = useRef(router)
  const [navigate, setNavigate] = useState<HistoryAdapterNavigate | undefined>()

  routerRef.current = router

  const history: HistoryAdapter = useMemo(
    () => ({
      subscribe(navigate) {
        setNavigate(() => navigate)
        return () => setNavigate(undefined)
      },
      update(update) {
        switch (update.type) {
          case 'push':
            return routerRef.current.push(update.url)
          case 'pop':
            return routerRef.current.back()
          case 'replace':
            return routerRef.current.replace(update.url)
          default:
            throw new Error(`Unknown update type: ${update.type}`)
        }
      },
    }),
    [],
  )

  useEffect(
    () =>
      enableOverlays({
        allowStudioOrigin: studioOrigin,
        history,
      }),
    [history, studioOrigin],
  )

  useEffect(() => {
    if (navigate) {
      navigate({
        type: 'push',
        url: `${pathname}${searchParams?.size ? `?${searchParams}` : ''}`,
      })
    }
  }, [navigate, pathname, searchParams])

  useLiveMode({allowStudioOrigin: studioOrigin, client})

  return null
}
