import { NextPage } from 'next'
import React, { useEffect, useMemo } from 'react'
import { wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
import { WithSplitPanelPageProps } from 'components/common/ColneAppWithLayout'
import { SplitPanel } from '@cloudscape-design/components'

const ChekisAdd: NextPage<WithSplitPanelPageProps> = ({
  splitPanelState,
  setSplitPanelState,
}) => {
  const splitPanelUI = useMemo(
    () => (
      <SplitPanel
        header="チェキ追加"
        i18nStrings={{
          closeButtonAriaLabel: '閉じる',
          openButtonAriaLabel: '開く',
          preferencesCancel: 'キャンセル',
          preferencesConfirm: 'OK',
          preferencesPositionBottom: '下固定',
          preferencesPositionDescription: '表示位置を変更します',
          preferencesPositionLabel: '表示位置',
          preferencesPositionSide: '横固定',
          preferencesTitle: '表示位置変更',
          resizeHandleAriaLabel: 'リサイズ',
        }}
      >
        TODO
      </SplitPanel>
    ),
    []
  )
  useEffect(() => {
    setSplitPanelState({
      splitPanelOpen: true,
      children: splitPanelUI,
    })
    return () => {
      setSplitPanelState({
        splitPanelOpen: false,
        children: null,
      })
    }
  }, [setSplitPanelState, splitPanelUI])

  return <></>
}

ChekisAdd.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (ctx) => {
    const currentUser = store.getState().user.currentUser
    if (!currentUser) {
      await redirectIfNotLoggedIn(ctx)
    }
  }
)

export default ChekisAdd
