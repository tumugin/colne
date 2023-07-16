'use client'

import { RecoilRoot } from 'recoil'

export function NextRecoilRoot({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>
}
