export const runtime = 'edge' // May need to change this to 'node' if the database is not edge ready

type IncomingRequest = {
  code: string
  scope: string
  grant_type: 'authorization_code' | 'refresh_token' // On the front end you'll determine which one to use
}

type AuthResponse = {
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  access_token: string
}

const stravaAuthTokenURL = 'https://www.strava.com/oauth/token '

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<IncomingRequest>
    const { code, scope, grant_type } = body

    if (!code || !scope) {
      return new Response('Bad Request', { status: 400 })
    }

    const exchangeBody = JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type,
      code,
    })

    const stravaAuthResponse = await fetch(stravaAuthTokenURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: exchangeBody,
    })

    if (!stravaAuthResponse.ok) {
      throw new Error('Strava Auth Failed')
    }

    // Save this to your DB
    const authResponse = (await stravaAuthResponse.json()) as AuthResponse

    return new Response(null, { status: 201 })
  } catch (e: any) {
    console.log({ e })
    return new Response('Internal Server Error', { status: 500 })
  }
}
