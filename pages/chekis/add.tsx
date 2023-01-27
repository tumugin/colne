import { NextPage } from 'next'
import React, { useEffect, useMemo, useState } from 'react'
import { wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
import { WithSplitPanelPageProps } from 'components/common/ColneAppWithLayout'
import { SplitPanel } from '@cloudscape-design/components'
import { ChekiAddPanel } from 'components/chekis/ChekiAddPanel'
import { useForm } from 'react-hook-form'

export interface ChekiAddContents {
  idolId: string
  regulationId: string
  chekiQuantity: number
  chekiShotAt: string
}

const ChekisAdd: NextPage<WithSplitPanelPageProps> = ({
  splitPanelState,
  setSplitPanelState,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, getValues, formState } = useForm<ChekiAddContents>({
    defaultValues: {
      chekiQuantity: 1,
    },
    mode: 'all',
  })

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
        <ChekiAddPanel control={control} />
      </SplitPanel>
    ),
    [control]
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
