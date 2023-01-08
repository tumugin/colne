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
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface IdolCreateFormContents {
  name: string
  idolStatus: 'private' | 'public'
}

const idolStatusOptions = [
  { label: '非公開', value: 'private' },
  { label: '公開', value: 'public' },
] as const

export function IdolCreateForm() {
  const { control } = useForm<IdolCreateFormContents>({
    defaultValues: {
      name: '',
      idolStatus: 'private',
    },
  })

  return (
    <Container header={<Header variant="h2">アイドルを新しく登録する</Header>}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button formAction="none" variant="link">
                キャンセル
              </Button>
              <Button variant="primary">登録する</Button>
            </SpaceBetween>
          }
        >
          <SpaceBetween direction="vertical" size="m">
            <FormField label="アイドル名">
              <Controller
                name="name"
                control={control}
                rules={{ required: true, min: 1, max: 255 }}
                render={({ field, fieldState }) => (
                  <Input {...field} autoFocus invalid={!!fieldState.error} />
                )}
              />
            </FormField>
            <FormField label="アイドルの公開状態">
              <Controller
                name="idolStatus"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Select
                    selectedOption={
                      idolStatusOptions.find((x) => x.value === field.value)!
                    }
                    onChange={({ detail }) =>
                      field.onChange(detail.selectedOption.value)
                    }
                    options={idolStatusOptions}
                    invalid={!!fieldState.error}
                  />
                )}
              />
            </FormField>
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
