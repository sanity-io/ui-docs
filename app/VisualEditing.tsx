import {useLocation, useNavigate} from '@remix-run/react'
import {enableOverlays, HistoryAdapter, HistoryAdapterNavigate} from '@sanity/overlays'
import {ReactNode, useEffect, useMemo, useState} from 'react'

import {useApp} from './useApp'

export default function VisualEditing(props: {allowStudioOrigin: string}): ReactNode {
  const {allowStudioOrigin} = props
  const {store} = useApp()
  const {hash, pathname, search} = useLocation()
  const navigateRemix = useNavigate()
  const [navigate, setNavigate] = useState<HistoryAdapterNavigate>()

  const history: HistoryAdapter = useMemo(
    () => ({
      subscribe: (navigate) => {
        setNavigate(navigate)
        return () => setNavigate(undefined)
      },
      update: (update) => {
        if (update.type === 'push') navigateRemix(update.url)
        if (update.type === 'replace') navigateRemix(update.url, {replace: true})
        if (update.type === 'pop') navigateRemix(-1)
      },
    }),
    [navigateRemix],
  )

  useEffect(() => {
    navigate?.({type: 'push', url: `${pathname}${search}${hash}`})
  }, [hash, navigate, pathname, search])

  useEffect(() => {
    return enableOverlays({allowStudioOrigin, history})
  }, [allowStudioOrigin, history])

  store.useLiveMode({allowStudioOrigin})

  return null
}
