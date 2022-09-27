import type {LoaderFunctionArgs, TypedResponse} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {validatePreviewUrl} from '@sanity/preview-url-secret'

import {getClient} from '~/sanity'
import {commitSession, getSession} from '~/session'

export async function loader({request}: LoaderFunctionArgs): Promise<TypedResponse> {
  const session = await getSession(request.headers.get('Cookie'))

  const dataset = process.env.SANITY_DATASET || 'development'
  const projectId = process.env.SANITY_PROJECT_ID || 'mos42crl'
  const readToken = process.env.SANITY_API_READ_TOKEN

  if (!readToken) {
    return new Response('missing token', {status: 401})
  }

  const client = getClient({projectId, dataset, token: readToken})

  const {isValid, redirectTo = '/'} = await validatePreviewUrl(client, request.url)

  if (!isValid) {
    return new Response('invalid secret', {status: 401})
  }

  session.set('preview', true)

  return redirect(redirectTo, {headers: {'Set-Cookie': await commitSession(session)}})
}
