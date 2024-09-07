'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { invalidateNextCache } from 'libs/cache'

/**
 * Revalidate server components when navigating to a new page.
 */
export function RevalidateServerComponentsHack() {
  const router = useRouter()

  useEffect(() => {
    const push = router.push.bind(router)

    router.push = async (href, options) => {
      await invalidateNextCache()
      push(href, options)
    }
  }, [router])

  return null
}
