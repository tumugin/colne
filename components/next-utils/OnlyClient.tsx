import { useEffect, useState } from 'react'

export function OnlyClient({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- This is intentional for client-side only rendering
    setIsClient(true)
  }, [])

  return isClient ? children : null
}
