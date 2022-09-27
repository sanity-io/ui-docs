import {createCookieSessionStorage} from '@remix-run/node'

interface SessionData {
  preview: boolean
}

interface SessionFlashData {
  error: string
}

const {getSession, commitSession, destroySession} = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__session',

    // all of these are optional
    domain: 'localhost',
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cret1'],
    secure: true,
  },
})

export {commitSession, destroySession, getSession}
