import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Cards,
  Header,
  Link,
  Pagination,
  SpaceBetween,
} from '@cloudscape-design/components'
import { groupDetailPage, idolDetailPage } from 'utils/urls'
import { onFollowNextLink } from 'utils/router'
import React from 'react'
import { GroupStatusBadge } from 'components/groups/GroupStatusBadge'

export interface GroupListViewGroupItem {
  name: string
  id: string
  status:
    | 'OPERATION_DELETED'
    | 'PRIVATE_ACTIVE'
    | 'PRIVATE_NOT_ACTIVE'
    | 'PUBLIC_ACTIVE'
    | 'PUBLIC_NOT_ACTIVE'
}

export function GroupListView({
  groups,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
  isSelectable,
  onSelectionChange,
  selectedGroupId,
  hideHeader,
  hideGroupStatus,
}: {
  groups: GroupListViewGroupItem[]
  isLoading: boolean
  totalPages: number | null
  currentPage: number
  onPageChange: (page: number) => void
  isSelectable?: boolean
  onSelectionChange?: (selectedGroupId: string) => void
  selectedGroupId?: string
  hideHeader?: boolean
  hideGroupStatus?: boolean
}) {
  const router = useRouter()

  return (
    <Box>
      <Cards
        cardDefinition={{
          header: (item) => (
            <Link
              fontSize="heading-m"
              href={groupDetailPage(item.id)}
              onFollow={(e) => onFollowNextLink(router, e)}
            >
              {item.name}
            </Link>
          ),
          sections: [
            ...(hideGroupStatus
              ? []
              : [
                  {
                    id: 'status',
                    header: '状態',
                    content: (item: GroupListViewGroupItem) => (
                      <GroupStatusBadge status={item.status} />
                    ),
                  },
                ]),
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 3 }]}
        items={groups}
        loadingText="読み込み中..."
        selectionType={isSelectable ? 'single' : undefined}
        selectedItems={
          selectedGroupId ? groups.filter((i) => i.id === selectedGroupId) : []
        }
        onSelectionChange={(e) =>
          onSelectionChange && onSelectionChange(e.detail.selectedItems[0].id)
        }
        loading={isLoading}
        empty={
          <Box textAlign="center" color="inherit">
            <b>結果が見つかりませんでした</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              まだグループが登録されていません。
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
          !hideHeader && (
            <Header
              actions={
                <SpaceBetween size="s" direction="horizontal">
                  <Button
                    href="/groups/create"
                    variant="primary"
                    onFollow={(e) =>
                      onFollowNextLink(router, e, '/groups/create')
                    }
                  >
                    新しく登録する
                  </Button>
                </SpaceBetween>
              }
              variant="h2"
            >
              ユーザーが登録したグループ一覧
            </Header>
          )
        }
      />
    </Box>
  )
}
