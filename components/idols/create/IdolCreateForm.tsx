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
import React, { useEffect, useState } from 'react'

export interface IdolCreateFormContents {
  name: string
  idolStatus: 'private' | 'public'
}

export function IdolCreateForm({
  onUpdateFormContents,
}: {
  onUpdateFormContents: (formContents: IdolCreateFormContents) => void
}) {
  const [idolName, setIdolName] = React.useState('')
  const idolStatusOptions = [
    { label: '非公開', value: 'private' },
    { label: '公開', value: 'public' },
  ] as const
  const [idolStatus, setIdolStatus] = useState<
    typeof idolStatusOptions[number]
  >({ label: '非公開', value: 'private' })

  useEffect(() => {
    onUpdateFormContents({
      name: idolName,
      idolStatus: idolStatus.value,
    })
  }, [idolName, idolStatus.value, onUpdateFormContents])

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
              <Input
                value={idolName}
                onChange={(event) => setIdolName(event.detail.value)}
                autoFocus
              />
            </FormField>
            <FormField label="アイドルの公開状態">
              <Select
                selectedOption={idolStatus}
                onChange={({ detail }) =>
                  setIdolStatus(
                    detail.selectedOption as typeof idolStatusOptions[number]
                  )
                }
                options={idolStatusOptions}
                selectedAriaLabel="Selected"
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
