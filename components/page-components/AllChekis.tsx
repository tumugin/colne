'use client'

import { deleteCheki, getUserAllChekis } from 'api-client/cheki'
import {
  Container,
  ContentLayout,
  Header,
  NonCancelableCustomEvent,
  Pagination,
  PaginationProps,
  SpaceBetween,
} from '@cloudscape-design/components'
import { useCallback, useState } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { AllChekiList } from 'components/chekis/AllChekiList'
import { DeleteChekiConfirmModal } from 'components/modal/DeleteChekiConfirmModal'
import toast from 'react-hot-toast'
import { useToastTheme } from 'libs/dom/toast-theme-hooks'
import { useRouter } from 'next/navigation'
import { OnlyClient } from 'components/next-utils/OnlyClient'

export function AllChekis({
  currentPage,
  count,
  pageCount,
  chekis,
}: {
  currentPage: number
  count: number
  pageCount: number
  chekis: Awaited<ReturnType<typeof getUserAllChekis>>['chekis']
}) {
  const [_, setPage] = useQueryState(
    'page',
    parseAsInteger.withOptions({ history: 'push' }),
  )
  const onPageChange = useCallback(
    async (event: NonCancelableCustomEvent<PaginationProps.ChangeDetail>) => {
      await setPage(event.detail.currentPageIndex)
    },
    [setPage],
  )

  const [deleteChekiModalState, setDeleteChekiModalState] = useState<{
    isOpen: boolean
    targetCheki: (typeof chekis)[0]
  }>()
  const onDeleteCheki = useCallback(
    (chekiId: string) => {
      const targetCheki = chekis.find((c) => c.chekiId === chekiId)
      setDeleteChekiModalState(
        targetCheki
          ? {
              isOpen: true,
              targetCheki: targetCheki,
            }
          : undefined,
      )
    },
    [chekis],
  )
  const onModalClose = useCallback(() => {
    setDeleteChekiModalState(undefined)
  }, [])
  const toastStyles = useToastTheme()
  const router = useRouter()
  const onDeleteChekiConfirm = useCallback(async () => {
    const deleteChekiId = deleteChekiModalState?.targetCheki?.chekiId
    setDeleteChekiModalState(undefined)
    if (deleteChekiId) {
      await deleteCheki({ chekiId: deleteChekiId })
      router.refresh()
      toast('チェキを削除しました！', {
        icon: '👏',
        style: toastStyles.success,
      })
    }
  }, [deleteChekiModalState?.targetCheki?.chekiId, router, toastStyles.success])

  return (
    <>
      <ContentLayout>
        <SpaceBetween size="xxl">
          <Container
            header={
              <Header
                variant="h2"
                actions={
                  <Pagination
                    currentPageIndex={currentPage}
                    onChange={onPageChange}
                    pagesCount={pageCount}
                  />
                }
              >
                撮影した全てのチェキ({count}件)
              </Header>
            }
          />
          <OnlyClient>
            <AllChekiList
              isLoading={false}
              chekis={chekis}
              onDeleteCheki={onDeleteCheki}
            />
          </OnlyClient>
        </SpaceBetween>
      </ContentLayout>
      <DeleteChekiConfirmModal
        onConfirm={onDeleteChekiConfirm}
        onCancel={onModalClose}
        show={deleteChekiModalState?.isOpen ?? false}
        deleteTargetCheki={deleteChekiModalState?.targetCheki}
        idol={deleteChekiModalState?.targetCheki?.idol ?? undefined}
      />
    </>
  )
}
