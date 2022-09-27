import {Outlet, useRouteError} from '@remix-run/react'
import {ReactElement} from 'react'

// import {Box} from '~/components/Box'

export default function Boundary(): ReactElement {
  return <Outlet />
}

export function ErrorBoundary(): ReactElement {
  const error = useRouteError()

  console.error(error)

  return (
    <div>
      <h1>Error Boundary</h1>
      {/* <p>{error.message}</p> */}
      {/* <pre>{error.stack}</pre> */}
    </div>
  )
}
