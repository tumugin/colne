import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  Container,
  Form,
  FormField,
  Header,
  Input,
} from '@cloudscape-design/components'
import toast from 'react-hot-toast'
import { useToastTheme } from 'libs/dom/toast-theme-hooks'

export interface UpdateUserNameFormContents {
  userName: string
}

export function UpdateUserNameForm({
  initialValue,
  onSubmit,
}: {
  initialValue?: UpdateUserNameFormContents
  onSubmit: (data: UpdateUserNameFormContents) => Promise<unknown> | void
}) {
  const toastStyles = useToastTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, getValues, formState, trigger } =
    useForm<UpdateUserNameFormContents>({
      defaultValues: {
        userName: initialValue?.userName ?? '',
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
    toast('ユーザー名を更新しました！', {
      icon: '🎉',
      style: toastStyles.success,
    })
  }, [
    formState.isValid,
    getValues,
    isSubmitting,
    onSubmit,
    toastStyles.success,
    trigger,
  ])

  return (
    <Container header={<Header>ユーザー名を更新する</Header>}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void handleOnSubmit()
        }}
      >
        <Form actions={<Button variant="primary">登録する</Button>}>
          <Controller
            name="userName"
            control={control}
            rules={{
              required: 'ユーザー名の入力は必須です',
              maxLength: {
                value: 255,
                message: 'ユーザー名の入力上限は255文字です',
              },
            }}
            render={({ field, fieldState }) => (
              <FormField
                label="ユーザー名"
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
        </Form>
      </form>
    </Container>
  )
}
