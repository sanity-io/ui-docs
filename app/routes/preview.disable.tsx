import type {LoaderFunctionArgs, TypedResponse} from '@remix-run/node'
import {redirect} from '@remix-run/node'

import {commitSession, getSession} from '~/session'

export async function loader({request}: LoaderFunctionArgs): Promise<TypedResponse> {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.get('preview')) {
    session.unset('preview')
  }

  return redirect('/', {headers: {'Set-Cookie': await commitSession(session)}})
}
