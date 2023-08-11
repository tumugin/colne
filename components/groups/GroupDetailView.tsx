import {
  Box,
  Button,
  Container,
  Header,
  TextContent,
} from '@cloudscape-design/components'
import { groupEditPage } from 'utils/urls'
import { onFollowNextLink } from 'utils/router'
import React from 'react'
import { useRouter } from 'next/navigation'
import { GroupStatusBadge } from 'components/groups/GroupStatusBadge'

export function GroupDetailView({
  group,
}: {
  group: {
    groupName: string
    groupId: string
    groupStatus:
      | 'OPERATION_DELETED'
      | 'PRIVATE_ACTIVE'
      | 'PRIVATE_NOT_ACTIVE'
      | 'PUBLIC_ACTIVE'
      | 'PUBLIC_NOT_ACTIVE'
    userId?: string | null
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
              href={groupEditPage(group.groupId)}
              variant="primary"
              onFollow={(e) =>
                onFollowNextLink(router, e, groupEditPage(group.groupId))
              }
            >
              グループを編集する
            </Button>
          }
        >
          {group.groupName}
        </Header>
      }
    >
      <TextContent>
        <Box>
          <h5>ステータス</h5>
          <GroupStatusBadge status={group.groupStatus} />
        </Box>
      </TextContent>
    </Container>
  )
}
