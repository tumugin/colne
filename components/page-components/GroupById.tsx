'use client'

import { Group, removeIdol } from 'api-client/group'
import {
  Box,
  Button,
  ContentLayout,
  Modal,
  SpaceBetween,
} from '@cloudscape-design/components'
import { GroupDetailView } from 'components/groups/GroupDetailView'
import { GroupIdolList } from 'components/groups/GroupIdolList'
import { nonNullable } from 'utils/array'
import React, { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToastTheme } from 'libs/dom/toast-theme-hooks'
import toast from 'react-hot-toast'

export function GroupById({ group }: { group: Group }) {
  const router = useRouter()

  const toastStyles = useToastTheme()
  const [showDeleteIdolModal, setShowDeleteIdolModal] = useState(false)
  const [deleteIdolId, setDeleteIdolId] = useState<string | null>(null)
  const deleteTargetIdol = useMemo(
    () => group.idols.find((v) => v?.idolId == deleteIdolId),
    [group.idols, deleteIdolId],
  )
  const onDeleteIdolConfirm = useCallback(async () => {
    setShowDeleteIdolModal(false)
    if (deleteIdolId) {
      await removeIdol({ groupId: group.groupId, idolId: deleteIdolId })
      router.refresh()
      toast.success('アイドルを削除しました', {
        icon: '👏',
        style: toastStyles.success,
      })
    }
  }, [deleteIdolId, group.groupId, router, toastStyles.success])
  const onRemoveIdol = useCallback((idolId: string) => {
    setDeleteIdolId(idolId)
    setShowDeleteIdolModal(true)
  }, [])

  return (
    <ContentLayout>
      <SpaceBetween size="xxl">
        <GroupDetailView group={group} />
        <GroupIdolList
          idols={group.idols.filter(nonNullable)}
          onRemoveIdol={onRemoveIdol}
        />
      </SpaceBetween>
      {showDeleteIdolModal && deleteTargetIdol && (
        <Modal
          onDismiss={() => setShowDeleteIdolModal(false)}
          visible={true}
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  variant="link"
                  onClick={() => setShowDeleteIdolModal(false)}
                >
                  キャンセル
                </Button>
                <Button variant="primary" onClick={onDeleteIdolConfirm}>
                  削除する
                </Button>
              </SpaceBetween>
            </Box>
          }
          header="アイドルをグループから削除しますか？"
        >
          {deleteTargetIdol.idolName}をグループから削除しますか？
        </Modal>
      )}
    </ContentLayout>
  )
}
