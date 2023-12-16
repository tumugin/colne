import { useEffect, useState } from 'react'

export const mediaQuerySpSize = '(max-width: 768px)'

export function useIsSmartphoneScreenSize() {
  // media query
  const [isSmartphoneScreenSize, setIsSmartphoneScreenSize] = useState(
    typeof window != 'undefined' && window.matchMedia(mediaQuerySpSize).matches,
  )
  useEffect(() => {
    const mediaQuery = window.matchMedia(mediaQuerySpSize)
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
