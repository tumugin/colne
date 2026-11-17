'use client'

import { useToastTheme } from 'libs/dom/toast-theme-hooks'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import {
  ChekiAddContents,
  ChekiAddPanel,
} from 'components/chekis/ChekiAddPanel'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import { SplitPanel } from '@cloudscape-design/components'
import { ChekiAddIdolSelectView } from 'components/chekis/ChekiAddIdolSelectView'
import { useAtom } from 'jotai'
import { splitPanelStateAtom } from 'recoil-store/globalPage'
import { addCheki } from 'api-client/cheki'
import { getIdolForChekiAdd, IdolForChekiAdd } from 'api-client/idol'
import { nonNullable } from 'utils/array'
import { useIsSmartphoneScreenSize } from 'libs/dom/screen-size'

export function ChekisAdd() {
  const toastStyles = useToastTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, trigger, formState, getValues } = useForm<ChekiAddContents>({
    defaultValues: {
      idolId: '',
      chekiQuantity: 1,
      regulationId: null,
      chekiShotAt: '',
    },
    mode: 'all',
  })

  const selectedIdolId = useWatch({ control, name: 'idolId' })

  const [selectedIdolDetails, setSelectedIdolDetails] =
    useState<IdolForChekiAdd | null>(null)

  useEffect(() => {
    if (selectedIdolId != '' && selectedIdolDetails?.idolId != selectedIdolId) {
      ;(async () => {
        setSelectedIdolDetails(
          await getIdolForChekiAdd({ idolId: selectedIdolId }),
        )
      })()
    }
  }, [selectedIdolDetails, selectedIdolId])

  const regulations = useMemo(
    () =>
      selectedIdolDetails?.groups.filter(nonNullable).flatMap((g) =>
        g.regulations.map((r) => ({
          groupId: g.groupId,
          groupName: g.groupName,
          regulationId: r.regulationId,
          regulationName: r.regulationName,
          regulationComment: r.regulationComment,
          regulationUnitPrice: r.regulationUnitPrice,
          regulationStatus: r.regulationStatus,
        })),
      ) ?? [],
    [selectedIdolDetails?.groups],
  )

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

  const [_, setSplitPanelState] = useAtom(splitPanelStateAtom)
  const isSmartphone = useIsSmartphoneScreenSize()

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

  useEffect(() => {
    setSplitPanelState((s) => ({
      ...s,
      splitPanelOpen: !isSmartphone,
    }))
  }, [isSmartphone, setSplitPanelState])

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
