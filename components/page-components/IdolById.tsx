'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { ColneDateRange } from 'components/parts/ColneDataRangePicker'
import {
  Box,
  Button,
  ContentLayout,
  Modal,
  SpaceBetween,
} from '@cloudscape-design/components'
import { IdolDetailsView } from 'components/idols/IdolDetailsView'
import { IdolChekiStats } from 'components/idols/idolChekiStats'
import { Idol } from 'api-client/idol'
import { nonNullable } from 'utils/array'
import { deleteCheki, IdolCheki } from 'api-client/cheki'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CurrentUser } from 'api-client/user'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import { useToastTheme } from 'libs/dom/toast-theme-hooks'

export function IdolById({
  idol,
  idolChekis,
  range,
  currentUser,
}: {
  idol: Idol
  idolChekis: IdolCheki[]
  range: {
    startISOString: string
    endISOString: string
  }
  currentUser: CurrentUser | null
}) {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const onDataTimeRangeChange = useCallback(
    (dateRange: ColneDateRange | null) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      dateRange?.startISOString &&
        current.set('chekiStart', dateRange.startISOString)
      dateRange?.endISOString && current.set('chekiEnd', dateRange.endISOString)
      router.push(`${pathName}?${current.toString()}`)
    },
    [pathName, router, searchParams],
  )

  const toastStyles = useToastTheme()
  const [showDeleteChekiModal, setShowDeleteChekiModal] = useState(false)
  const [deleteChekiId, setDeleteChekiId] = useState<string | null>(null)
  const deleteTargetCheki = useMemo(
    () => idolChekis.find((v) => v.chekiId == deleteChekiId),
    [idolChekis, deleteChekiId],
  )
  const onDeleteCheki = useCallback(async (chekiId: string) => {
    setDeleteChekiId(chekiId)
    setShowDeleteChekiModal(true)
  }, [])
  const onDeleteChekiConfirm = useCallback(async () => {
    setShowDeleteChekiModal(false)
    if (deleteChekiId) {
      await deleteCheki({ chekiId: deleteChekiId })
      router.refresh()
      toast('チェキを削除しました！', {
        icon: '👏',
        style: toastStyles.success,
      })
    }
  }, [deleteChekiId, router, toastStyles.success])

  return (
    <ContentLayout>
      <SpaceBetween size="xxl">
        <IdolDetailsView
          idol={{
            name: idol.idolName,
            id: idol.idolId,
            status: idol.idolStatus,
            groups: idol.groups.filter(nonNullable).map((group) => ({
              id: group.groupId,
              name: group.groupName,
            })),
            authorId: idol.user?.userId,
          }}
          currentUserId={currentUser?.userId}
        />
        {currentUser && idolChekis && (
          <IdolChekiStats
            isLoading={false}
            chekis={idolChekis}
            dateRange={{
              startISOString: range.startISOString,
              endISOString: range.endISOString,
            }}
            onDateRangeChange={onDataTimeRangeChange}
            onDeleteCheki={onDeleteCheki}
          />
        )}
        {showDeleteChekiModal && deleteTargetCheki && (
          <Modal
            onDismiss={() => setShowDeleteChekiModal(false)}
            visible={true}
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    variant="link"
                    onClick={() => setShowDeleteChekiModal(false)}
                  >
                    キャンセル
                  </Button>
                  <Button variant="primary" onClick={onDeleteChekiConfirm}>
                    削除する
                  </Button>
                </SpaceBetween>
              </Box>
            }
            header="チェキを削除しますか？"
          >
            {idol.idolName}の
            {dayjs(deleteTargetCheki.chekiShotAt).format('YYYY/MM/DD')}に
            {deleteTargetCheki.chekiQuantity}枚撮影されたチェキを削除しますか？
          </Modal>
        )}
      </SpaceBetween>
    </ContentLayout>
  )
}
