import {
  Box,
  Button,
  Cards,
  Header,
  Link,
  Pagination,
  SpaceBetween,
} from '@cloudscape-design/components'
import React from 'react'
import { IdolStatusBadge } from 'components/idols/IdolStatusBadge'
import { onFollowNextLink } from 'utils/router'
import { idolDetailPage } from 'utils/urls'
import { useRouter } from 'next/navigation'

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
  isSelectable,
  onSelectionChange,
  selectedIdolId,
  hideHeader,
  header,
  hideIdolStatus,
}: {
  idols: IdolListViewIdolItem[]
  isLoading: boolean
  totalPages?: number
  currentPage?: number
  onPageChange?: (page: number) => void
  isSelectable?: boolean
  onSelectionChange?: (selectedIdolId: string) => void
  selectedIdolId?: string
  hideHeader?: boolean
  header?: React.ReactNode
  hideIdolStatus?: boolean
}) {
  const router = useRouter()

  return (
    <Box>
      <Cards
        cardDefinition={{
          header: (item) => (
            <Link
              fontSize="heading-m"
              href={idolDetailPage(item.id)}
              onFollow={(e) => onFollowNextLink(router, e)}
            >
              {item.name}
            </Link>
          ),
          sections: [
            {
              id: 'groups',
              header: '所属グループ',
              content: (item) =>
                item.groups.length === 0
                  ? '-'
                  : item.groups.map((group) => group.name).join(', '),
            },
            ...(hideIdolStatus
              ? []
              : [
                  {
                    id: 'status',
                    header: '状態',
                    content: (item: IdolListViewIdolItem) => (
                      <IdolStatusBadge status={item.status} />
                    ),
                  },
                ]),
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 3 }]}
        items={idols}
        loadingText="読み込み中..."
        selectionType={isSelectable ? 'single' : undefined}
        selectedItems={
          selectedIdolId ? idols.filter((i) => i.id === selectedIdolId) : []
        }
        onSelectionChange={(e) =>
          onSelectionChange && onSelectionChange(e.detail.selectedItems[0].id)
        }
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
          currentPage &&
          onPageChange && (
            <Pagination
              currentPageIndex={currentPage}
              onChange={({ detail }) => onPageChange(detail.currentPageIndex)}
              pagesCount={totalPages ?? 0}
            />
          )
        }
        stickyHeader
        header={
          !hideHeader &&
          (header || (
            <Header
              actions={
                <SpaceBetween size="s" direction="horizontal">
                  <Button
                    href="/idols/create"
                    variant="primary"
                    onFollow={(e) =>
                      onFollowNextLink(router, e, '/idols/create')
                    }
                  >
                    新しく登録する
                  </Button>
                </SpaceBetween>
              }
              variant="h2"
            >
              ユーザーが登録したアイドル一覧
            </Header>
          ))
        }
      />
    </Box>
  )
}
