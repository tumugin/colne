import {
  Alert,
  Box,
  Button,
  Container,
  Form,
  FormField,
  Header,
  Input,
  Modal,
  Select,
  SpaceBetween,
} from '@cloudscape-design/components'
import React, { useCallback, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface IdolEditOrCreateFormContents {
  name: string
  status:
    | 'private_active'
    | 'private_not_active'
    | 'public_active'
    | 'public_not_active'
}

export function IdolEditOrCreateForm({
  isEdit,
  onSubmit,
  initialValue,
  onCancel,
  onDelete,
}: {
  isEdit?: boolean
  initialValue?: IdolEditOrCreateFormContents
  onSubmit?: (data: IdolEditOrCreateFormContents) => Promise<unknown> | void
  onCancel?: () => void
  onDelete?: () => void
}) {
  const idolStatusOptions: {
    label: string
    value: IdolEditOrCreateFormContents['status']
  }[] = useMemo(
    () =>
      !isEdit
        ? [
            { label: '非公開', value: 'private_active' },
            { label: '公開', value: 'public_not_active' },
          ]
        : [
            { label: '非公開(活動中)', value: 'private_active' },
            { label: '非公開(休止中)', value: 'private_not_active' },
            { label: '公開(活動中)', value: 'public_active' },
            { label: '公開(休止中)', value: 'public_not_active' },
          ],
    [isEdit],
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, getValues, formState, trigger } =
    useForm<IdolEditOrCreateFormContents>({
      defaultValues: {
        name: initialValue?.name ?? '',
        status: initialValue?.status ?? 'private_active',
      },
      mode: 'all',
    })
  const handleOnSubmit = useCallback(async () => {
    await trigger()
    if (!formState.isValid || isSubmitting) {
      return
    }
    setIsSubmitting(true)
    onSubmit && (await onSubmit(getValues()))
    setIsSubmitting(false)
  }, [formState.isValid, getValues, isSubmitting, onSubmit, trigger])

  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    useState(false)

  return (
    <SpaceBetween size="xxl">
      <Container
        header={
          <Header variant="h2">
            {isEdit ? 'アイドルを編集する' : 'アイドルを新しく登録する'}
          </Header>
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void handleOnSubmit()
          }}
        >
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button formAction="none" variant="link" onClick={onCancel}>
                  キャンセル
                </Button>
                <Button variant="primary">登録する</Button>
              </SpaceBetween>
            }
          >
            <SpaceBetween direction="vertical" size="m">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'アイドル名の入力は必須です',
                  maxLength: {
                    value: 255,
                    message: 'アイドル名の入力上限は255文字です',
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormField
                    label="アイドル名"
                    errorText={fieldState.error && fieldState.error.message}
                  >
                    <Input
                      onChange={(e) => field.onChange(e.detail.value)}
                      value={field.value}
                      onBlur={field.onBlur}
                      invalid={!!fieldState.error}
                    />
                  </FormField>
                )}
              />

              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormField
                    label="アイドルの公開状態"
                    errorText={fieldState.error && fieldState.error.message}
                  >
                    <Select
                      selectedOption={
                        idolStatusOptions.find(
                          (x) => x.value === field.value,
                        ) ?? null
                      }
                      onChange={({ detail }) =>
                        field.onChange(detail.selectedOption.value)
                      }
                      options={idolStatusOptions}
                      invalid={!!fieldState.error}
                      // FIXME: ライブラリのバグでこれを指定しないとproductionビルド時にエラーになる
                      renderHighlightedAriaLive={() => ''}
                    />
                  </FormField>
                )}
              />
              <Alert>
                アイドルの公開状態を公開状態にすると他のユーザからの参照が可能になります
              </Alert>
              <Alert>アイドルへのグループの紐付けは登録後に行えます</Alert>
            </SpaceBetween>
          </Form>
        </form>
      </Container>
      {isEdit && initialValue && (
        <Container header={<Header variant="h2">アイドルを削除する</Header>}>
          <Modal
            onDismiss={() => setDeleteConfirmModalVisible(false)}
            visible={deleteConfirmModalVisible}
            closeAriaLabel="閉じる"
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    variant="link"
                    onClick={() => setDeleteConfirmModalVisible(false)}
                  >
                    キャンセル
                  </Button>
                  <Button variant="primary" onClick={onDelete}>
                    削除する
                  </Button>
                </SpaceBetween>
              </Box>
            }
            header="本当にアイドルを削除しますか？"
          >
            <b>{initialValue.name}</b>は削除すると元に戻すことが出来ません。
          </Modal>
          <SpaceBetween size="m">
            <Alert type="warning">
              一度削除したアイドルは元に戻すことが出来ません
            </Alert>
            <Button
              variant="normal"
              onClick={() => setDeleteConfirmModalVisible(true)}
            >
              アイドルを削除する
            </Button>
          </SpaceBetween>
        </Container>
      )}
    </SpaceBetween>
  )
}
