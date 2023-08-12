import React, { useCallback, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  Container,
  Form,
  FormField,
  Header,
  Input,
  Select,
  SpaceBetween,
} from '@cloudscape-design/components'

export interface RegulationEditOrCreateFormProps {
  regulationComment: string
  regulationName: string
  regulationStatus: 'ACTIVE' | 'NOT_ACTIVE'
  regulationUnitPrice: number
}

export function RegulationEditOrCreateForm({
  initialValues,
  onSubmit,
  isEdit,
  targetGroup,
  onCancel,
  onDelete,
}: {
  isEdit?: boolean
  initialValues?: RegulationEditOrCreateFormProps
  onSubmit: (values: RegulationEditOrCreateFormProps) => void
  onCancel: () => void
  onDelete?: () => void
  targetGroup: {
    groupName: string
  }
}) {
  const regulationStatusOptions = useMemo(
    () => [
      { label: '有効', value: 'ACTIVE' },
      { label: 'すでに無効なレギュレーション', value: 'NOT_ACTIVE' },
    ],
    [],
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, getValues, formState, trigger } =
    useForm<RegulationEditOrCreateFormProps>({
      defaultValues: {
        regulationComment: initialValues?.regulationComment ?? '',
        regulationName: initialValues?.regulationName ?? '',
        regulationStatus: initialValues?.regulationStatus ?? 'ACTIVE',
        regulationUnitPrice: initialValues?.regulationUnitPrice ?? 0,
      },
      mode: 'all',
    })
  const handleOnSubmit = useCallback(async () => {
    await trigger()
    if (!formState.isValid || isSubmitting) {
      return
    }
    setIsSubmitting(true)
    onSubmit(getValues())
    setIsSubmitting(false)
  }, [formState.isValid, getValues, isSubmitting, onSubmit, trigger])

  return (
    <SpaceBetween size="xxl">
      <Container
        header={
          <Header variant="h2">
            {isEdit
              ? `${targetGroup.groupName}のレギュレーションを編集する`
              : `${targetGroup.groupName}レギュレーションを新しく登録する`}
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
                name="regulationName"
                control={control}
                rules={{
                  required: 'レギュレーション名の入力は必須です',
                  maxLength: {
                    value: 255,
                    message: 'レギュレーション名の入力上限は255文字です',
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormField
                    label="レギュレーション名"
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
                name="regulationComment"
                control={control}
                rules={{
                  maxLength: {
                    value: 1000,
                    message: 'レギュレーションコメントの入力上限は1000文字です',
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormField
                    label="レギュレーションコメント"
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
                name="regulationStatus"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormField
                    label="レギュレーションの状態"
                    errorText={fieldState.error && fieldState.error.message}
                  >
                    <Select
                      selectedOption={
                        regulationStatusOptions.find(
                          (x) => x.value === field.value,
                        ) ?? null
                      }
                      onChange={({ detail }) =>
                        field.onChange(
                          detail.selectedOption
                            .value as (typeof regulationStatusOptions)[0]['value'],
                        )
                      }
                      options={regulationStatusOptions}
                      invalid={!!fieldState.error}
                      // FIXME: ライブラリのバグでこれを指定しないとproductionビルド時にエラーになる
                      renderHighlightedAriaLive={() => ''}
                    />
                  </FormField>
                )}
              />

              <Controller
                name="regulationUnitPrice"
                control={control}
                rules={{
                  required: true,
                  min: { value: 0, message: '0円以上のみ指定可能です' },
                }}
                render={({ field, fieldState }) => (
                  <FormField
                    label="レギュレーションの単価(日本円)"
                    errorText={fieldState.error && fieldState.error.message}
                  >
                    <Input
                      onChange={(e) => field.onChange(parseInt(e.detail.value))}
                      value={field.value.toString()}
                      onBlur={field.onBlur}
                      invalid={!!fieldState.error}
                      type="number"
                    />
                  </FormField>
                )}
              />
            </SpaceBetween>
          </Form>
        </form>
      </Container>
    </SpaceBetween>
  )
}
