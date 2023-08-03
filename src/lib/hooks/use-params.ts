import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export function useParams<T>() {
  const searchParams = useSearchParams()
  const [params, setParams] = useState<T>({} as T)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const code = searchParams.get('code')
    const scope = searchParams.get('scope')
    const error = searchParams.get('error')

    setParams({ code, scope, error } as T)
  }, [searchParams])

  return params
}
