import {
  Alert,
  Button,
  Container,
  Form,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
} from '@cloudscape-design/components'
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface IdolCreateFormContents {
  name: string
  status: 'private' | 'public'
}

const idolStatusOptions: {
  label: string
  value: IdolCreateFormContents['status']
}[] = [
  { label: '非公開', value: 'private' },
  { label: '公開', value: 'public' },
]

export function IdolCreateForm({
  onSubmit,
  onCancel,
}: {
  onSubmit?: (data: IdolCreateFormContents) => Promise<unknown> | void
  onCancel?: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, getValues, formState, trigger } =
    useForm<IdolCreateFormContents>({
      defaultValues: {
        name: '',
        status: 'private',
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

  return (
    <Container header={<Header variant="h2">アイドルを新しく登録する</Header>}>
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
                      idolStatusOptions.find((x) => x.value === field.value) ??
                      null
                    }
                    onChange={({ detail }) =>
                      field.onChange(detail.selectedOption.value)
                    }
                    options={idolStatusOptions}
                    invalid={!!fieldState.error}
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
  )
}
