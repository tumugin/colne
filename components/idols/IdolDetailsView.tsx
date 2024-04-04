import {
  Badge,
  Box,
  Button,
  Container,
  Header,
  Link,
  SpaceBetween,
  TextContent,
} from '@cloudscape-design/components'
import React from 'react'
import { IdolStatusBadge } from 'components/idols/IdolStatusBadge'
import { groupDetailPage, idolEditPage } from 'utils/urls'
import { onFollowNextLink } from 'utils/router'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

const StyledBadge = styled(Badge)`
  cursor: pointer;
`

export function IdolDetailsView({
  idol,
  enableEdit,
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
  enableEdit: boolean
}) {
  const router = useRouter()

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            enableEdit && (
              <Button
                href={idolEditPage(idol.id)}
                variant="primary"
                onFollow={(e) =>
                  onFollowNextLink(router, e, idolEditPage(idol.id))
                }
              >
                アイドルを編集する
              </Button>
            )
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
            <SpaceBetween size="xs" direction="horizontal">
              {idol.groups.length === 0
                ? '-'
                : idol.groups.map((group) => (
                    <Link
                      href={groupDetailPage(group.id)}
                      key={group.id}
                      onFollow={(e) =>
                        onFollowNextLink(router, e, groupDetailPage(group.id))
                      }
                      variant="primary"
                    >
                      {group.name}
                    </Link>
                  ))}
            </SpaceBetween>
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
