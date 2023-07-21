import {
  Badge,
  Box,
  Button,
  Container,
  Header,
  SpaceBetween,
  TextContent,
} from '@cloudscape-design/components'
import React from 'react'
import { IdolStatusBadge } from 'components/idols/IdolStatusBadge'
import { idolEditPage } from 'utils/urls'
import { onFollowNextLink } from 'utils/router'
import { useRouter } from 'next/navigation'

export function IdolDetailsView({
  idol,
  currentUserId,
}: {
  idol: {
    name: string
    id: string
    status:
      | 'OPERATION_DELETED'
      | 'PRIVATE_ACTIVE'
      | 'PRIVATE_NOT_ACTIVE'
      | 'PUBLIC_ACTIVE'
      | 'PUBLIC_NOT_ACTIVE'
    groups: { id: string; name: string }[]
    authorId?: string
  }
  currentUserId?: string
}) {
  const router = useRouter()

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            <Button
              href={idolEditPage(idol.id)}
              variant="primary"
              onFollow={(e) =>
                onFollowNextLink(router, e, idolEditPage(idol.id))
              }
            >
              アイドルを編集する
            </Button>
          }
        >
          {idol.name}
        </Header>
      }
    >
      <TextContent>
        <SpaceBetween size="xs" direction="vertical">
          <Box>
            <h5>所属グループ</h5>
            {idol.groups.length === 0
              ? '-'
              : idol.groups.map((group) => (
                  <Badge key={group.id} color="grey">
                    {group.name}
                  </Badge>
                ))}
          </Box>
          <Box>
            <h5>ステータス</h5>
            <IdolStatusBadge status={idol.status} />
          </Box>
        </SpaceBetween>
      </TextContent>
    </Container>
  )
}
