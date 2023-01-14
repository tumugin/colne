import {
  Box,
  Button,
  Cards,
  Container,
  Header,
  Link,
  Pagination,
  SpaceBetween,
} from '@cloudscape-design/components'
import React from 'react'
import { IdolStatusBadge } from 'components/idols/IdolStatusBadge'
import { useRouter } from 'next/router'
import { onFollowNextLink } from 'utils/router'

export interface IdolListViewIdolItem {
  name: string
  id: string
  status:
    | 'OPERATION_DELETED'
    | 'PRIVATE_ACTIVE'
    | 'PRIVATE_NOT_ACTIVE'
    | 'PUBLIC_ACTIVE'
    | 'PUBLIC_NOT_ACTIVE'
  groups: { id: string; name: string }[]
}

export function IdolListView({
  idols,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
}: {
  idols: IdolListViewIdolItem[]
  isLoading: boolean
  totalPages: number | null
  currentPage: number
  onPageChange: (page: number) => void
}) {
  const router = useRouter()

  return (
    <Container>
      <Cards
        cardDefinition={{
          header: (item) => <Link fontSize="heading-m">{item.name}</Link>,
          sections: [
            {
              id: 'groups',
              header: '所属グループ',
              content: (item) =>
                item.groups.length === 0
                  ? '-'
                  : item.groups.map((group) => group.name).join(', '),
            },
            {
              id: 'status',
              header: '状態',
              content: (item) => <IdolStatusBadge status={item.status} />,
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 3 }]}
        items={idols}
        loadingText="読み込み中..."
        loading={isLoading}
        empty={
          <Box textAlign="center" color="inherit">
            <b>結果が見つかりませんでした</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              まだアイドルが登録されていません。
            </Box>
          </Box>
        }
        pagination={
          <Pagination
            currentPageIndex={currentPage}
            onChange={({ detail }) => onPageChange(detail.currentPageIndex)}
            pagesCount={totalPages ?? 0}
          />
        }
        header={
          <Header
            actions={
              <SpaceBetween size="s" direction="horizontal">
                <Button
                  href="/idols/create"
                  variant="primary"
                  onFollow={(e) => onFollowNextLink(router, e, '/idols/create')}
                >
                  新しく登録する
                </Button>
              </SpaceBetween>
            }
            variant="h2"
          >
            ユーザーが登録したアイドル一覧
          </Header>
        }
      />
    </Container>
  )
}
