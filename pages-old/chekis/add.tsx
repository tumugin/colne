import { NextPage } from 'next'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppSelector, wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
// @ts-ignore
import { WithSplitPanelPageProps } from 'components/common/ColneAppWithLayout'
import { SplitPanel } from '@cloudscape-design/components'
import {
  ChekiAddContents,
  ChekiAddPanel,
} from 'components/chekis/ChekiAddPanel'
import { Controller, useForm } from 'react-hook-form'
import { ChekiAddIdolSelectView } from 'components/chekis/ChekiAddIdolSelectView'
import { useGetIdolForChekiAdd } from 'store/idol/idolHooks'
import { useToastTheme } from 'libs/dom/toast-theme-hooks'
import toast from 'react-hot-toast'
import { useAddCheki } from 'store/cheki/chekiHooks'
import dayjs from 'dayjs'

const ChekisAdd: NextPage<WithSplitPanelPageProps> = ({
  setSplitPanelState,
}) => {
  const toastStyles = useToastTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, watch, trigger, formState, getValues } =
    useForm<ChekiAddContents>({
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
    (state) => state.idol.idolForChekiAdd[selectedIdolId],
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
        })),
      ) ?? [],
    [selectedIdolDetails?.groups],
  )

  const addCheki = useAddCheki()

  const onSubmit = useCallback(async () => {
    await trigger()
    if (!formState.isValid) {
      toast('入力項目に不足があります！', {
        icon: '🚨',
        style: toastStyles.warning,
      })
      return
    }
    if (isSubmitting) {
      return
    }
    setIsSubmitting(true)
    const formValues = getValues()
    try {
      await addCheki({
        chekiQuantity: formValues.chekiQuantity,
        chekiShotAt: dayjs(formValues.chekiShotAt).toISOString(),
        regulationId: formValues.regulationId,
        idolId: formValues.idolId,
      })
      toast('チェキを追加しました！', {
        icon: '👏',
        style: toastStyles.success,
      })
    } catch (e) {
      toast('エラーが発生しました', { icon: '😭', style: toastStyles.error })
      throw e
    } finally {
      setIsSubmitting(false)
    }
  }, [
    addCheki,
    formState.isValid,
    getValues,
    isSubmitting,
    toastStyles.error,
    toastStyles.success,
    toastStyles.warning,
    trigger,
  ])

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
    [control, onSubmit, regulations, selectedIdolDetails, selectedIdolId],
  )

  useEffect(() => {
    setSplitPanelState({
      splitPanelOpen: true,
      children: splitPanelUI,
    })
    return () => {
      setSplitPanelState({
        splitPanelOpen: true,
        children: null,
      })
    }
  }, [setSplitPanelState, splitPanelUI])

  return (
    <Controller
      rules={{ required: 'アイドルを必ず指定してください' }}
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
  },
)

export default ChekisAdd
