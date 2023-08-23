import { useEffect, useState } from 'react'

export function useIsSmartphoneScreenSize() {
  // media query
  const [isSmartphoneScreenSize, setIsSmartphoneScreenSize] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const listener = () => {
      setIsSmartphoneScreenSize(mediaQuery.matches)
    }
    mediaQuery.addEventListener('change', listener)
    listener()
    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [])

  return isSmartphoneScreenSize
}
