import Image from 'next/image'

export default function Home() {
  
  // TODO: auth with strava and get some basic data
  const stravaAuthBaseURL = 'https://www.strava.com/oauth/authorize';
  const redirectURL = 'http://localhost:3000/dashboard';
  console.log(redirectURL);
  
  // Auth by clicking "Click" button

  // After succesfull authorization, parse url for code, scope/activity

  // Make a request to exchange the auth code and scope for a refresh token, access token, and access token expiration date


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Strava Data Explorer</h1>
      
      <br />

      <div>
        {/* We are going to make a simple login page */}
        <a href={`${stravaAuthBaseURL}?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirectURL}&approval_prompt=force&scope=activity:read_all`}>
          Click
        </a>

      </div>
    </main>
  )
}
