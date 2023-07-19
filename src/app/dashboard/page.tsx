/**
 * We should take out the authorization logic and put it into 
 * a server side component since we don't want to expose our
 * auth logic to the client.
 */
'use client'

import { useSearchParams } from "next/navigation";

type parsedUrl = {
  authCode: string | null,
  scope: string | null
}

export default function Dashboard() {

  /**
   * searchParams helps us get the query params from the url
   * 
   * ex: searchParams.get('code') will return the value of the code query param
   */
  const searchParams = useSearchParams();

  const stravaAuthTokenURL = 'https://www.strava.com/oauth/token '; // POST

  // TODO: make sure user gave us the right scope for using their data
  const parseUrl = (): parsedUrl => {
    const authCode = searchParams.get('code');
    const scope = searchParams.get('scope');
    return { authCode, scope };
  }

  const getRefreshToken = async () => {
    const stravaAuthResponse = await fetch(stravaAuthTokenURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: parseUrl().authCode,
        grant_type: 'authorization_code'
      })
    })
    console.log('stravaAuthResponse:', stravaAuthResponse);
  }

  getRefreshToken();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Strava Data Explorer</h1>
      <br />
      <div>
        <h1>Hello Strava!</h1>
      </div>
    </main>
  )
}
