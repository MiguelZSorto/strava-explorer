'use client'

import { RequestAccessType } from '@/lib/types'
import { exchangeToken } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useParams } from '@/lib/hooks/use-params'

// TODO: auth with strava and get some basic data
const stravaAuthBaseURL = 'https://www.strava.com/oauth/authorize'

const redirectURL =
  'http://localhost:3000/dashboard' ?? 'http://localhost:3000/' // <-- @DarrylBrooks97 - I think you should redirect back to this page since `/dashboard` is a protected route

export default function Home() {
  const page = useRouter()
  const renderRef = useRef(0)
  const params = useParams<RequestAccessType>() // Custom hook to get the query params from the url

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (typeof params.error === 'string') {
      console.log(`Error: ${params.error}`)
      return
    }

    const hasAllQueryParams = params.code && params.scope

    // renderRef is to prevent multiple renders which will invalidate the auth code since it's a one time use code 🫤
    if (renderRef.current === 0 && hasAllQueryParams) {
      exchangeToken(params).then((response) => {
        if (!response.sucesss) {
          console.log('Error: ', response.error)
          return
        }

        // Redirect user to authorized page 🎉
        page.push('/dashboard')
      })
    }
  }, [page, params])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Strava Data Explorer</h1>

      <br />

      <div>
        {/* We are going to make a simple login page */}
        <a
          href={`${stravaAuthBaseURL}?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirectURL}&approval_prompt=force&scope=activity:read_all`}
        >
          Click
        </a>
      </div>
    </main>
  )
}
