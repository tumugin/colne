'use client'

import { Provider } from 'jotai'

export function NextJotaiRoot({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>
}
