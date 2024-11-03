import { Box, Button, Modal, SpaceBetween } from '@cloudscape-design/components'
import dayjs from 'dayjs'
import { IdolCheki } from 'api-client/cheki'

export function DeleteChekiConfirmModal({
  deleteTargetCheki,
  idol,
  show,
  onConfirm,
  onCancel,
}: {
  deleteTargetCheki?: IdolCheki
  idol?: { idolName: string }
  show: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  if (!deleteTargetCheki || !idol) {
    return null
  }

  return (
    <Modal
      onDismiss={onCancel}
      visible={show ?? false}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onCancel}>
              キャンセル
            </Button>
            <Button variant="primary" onClick={onConfirm}>
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
  )
}
