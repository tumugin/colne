'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Component to revalidate page. This is a hack for this issue.
 * https://github.com/vercel/next.js/issues/42991
 */
export function RevalidatePage() {
  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [router])

  return null
}
