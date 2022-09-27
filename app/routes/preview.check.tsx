import type {LoaderFunctionArgs, TypedResponse} from '@remix-run/node'
import {redirect} from '@remix-run/node'

export async function loader({request: _request}: LoaderFunctionArgs): Promise<TypedResponse> {
  // todo

  return redirect('/', {})
}
