import { NextPage } from 'next'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppSelector, wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
import { WithSplitPanelPageProps } from 'components/common/ColneAppWithLayout'
import { SplitPanel } from '@cloudscape-design/components'
import { ChekiAddPanel } from 'components/chekis/ChekiAddPanel'
import { Controller, useForm } from 'react-hook-form'
import { ChekiAddIdolSelectView } from 'components/chekis/ChekiAddIdolSelectView'
import { useGetIdolForChekiAdd } from 'store/idol/idolHooks'

export interface ChekiAddContents {
  idolId: string
  regulationId: string | null
  chekiQuantity: number
  chekiShotAt: string
}

const ChekisAdd: NextPage<WithSplitPanelPageProps> = ({
  splitPanelState,
  setSplitPanelState,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, watch, trigger } = useForm<ChekiAddContents>({
    defaultValues: {
      idolId: '',
      chekiQuantity: 1,
      regulationId: null,
      chekiShotAt: '',
    },
    mode: 'all',
  })
  const getIdolForChekiAdd = useGetIdolForChekiAdd()

  const selectedIdolId = watch('idolId')
  const selectedIdolDetails = useAppSelector(
    (state) => state.idol.idolForChekiAdd[selectedIdolId]
  )
  useEffect(() => {
    if (selectedIdolId && !selectedIdolDetails) {
      void getIdolForChekiAdd({ idolId: selectedIdolId })
    }
  }, [getIdolForChekiAdd, selectedIdolDetails, selectedIdolId])
  const regulations = useMemo(
    () =>
      selectedIdolDetails?.groups.flatMap((g) =>
        g.regulations.map((r) => ({
          groupId: g.groupId,
          groupName: g.groupName,
          regulationId: r.regulationId,
          regulationName: r.regulationName,
          regulationComment: r.regulationComment,
          regulationUnitPrice: r.regulationUnitPrice,
        }))
      ) ?? [],
    [selectedIdolDetails?.groups]
  )

  const onSubmit = useCallback(async () => {
    await trigger()
  }, [trigger])

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
        closeBehavior="collapse"
      >
        <ChekiAddPanel
          control={control}
          regulations={regulations}
          isRegulationLoading={selectedIdolId ? !selectedIdolDetails : false}
          onSubmit={onSubmit}
        />
      </SplitPanel>
    ),
    [control, onSubmit, regulations, selectedIdolDetails, selectedIdolId]
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

  return (
    <Controller
      render={({ field }) => (
        <ChekiAddIdolSelectView
          selectedIdolId={field.value}
          setSelectedIdolId={field.onChange}
        />
      )}
      name="idolId"
      control={control}
    />
  )
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
