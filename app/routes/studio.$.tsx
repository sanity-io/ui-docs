import {lazy, ReactElement, Suspense} from 'react'

import {useApp} from '~/useApp'

const Studio = lazy(() => import('~/studio.client'))

export default function StudioRoute(): ReactElement {
  const app = useApp()

  return (
    <Suspense>
      <Studio basePath="/studio" dataset={app.dataset} projectId={app.projectId} />
    </Suspense>
  )
}
