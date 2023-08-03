import { RequestAccessType } from './types'

export const exchangeToken = async (params: RequestAccessType) => {
  try {
    const stravaAuthResponse = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: params.code,
        scope: params.scope,
        grant_type: 'authorization_code', //
      }),
    })

    if (!stravaAuthResponse.ok) {
      const message = await stravaAuthResponse.text()
      return { sucesss: false, error: message }
    }

    return { sucesss: true, error: null }
  } catch (e: any) {
    const message = e.message
    return { sucesss: false, error: message }
  }
}
