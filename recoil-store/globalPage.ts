import { atom } from 'jotai'
import React from 'react'

interface SplitPanelProps {
  /** 必ず！！！絶対に！！！！！要素はメモ化すること！！！！！！！ */
  children: React.ReactNode
  splitPanelOpen: boolean
}

export const splitPanelStateAtom = atom<SplitPanelProps>({
  children: null,
  splitPanelOpen: false,
})
