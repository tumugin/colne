import { atom } from 'recoil'
import React from 'react'

interface SplitPanelProps {
  /** 必ず！！！絶対に！！！！！要素はメモ化すること！！！！！！！ */
  children: React.ReactNode
  splitPanelOpen: boolean
}

export const splitPanelStateAtom = atom<SplitPanelProps>({
  key: 'splitPanelState',
  default: {
    children: null,
    splitPanelOpen: false,
  },
})
