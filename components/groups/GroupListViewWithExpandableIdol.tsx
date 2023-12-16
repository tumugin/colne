import {
  Box,
  Container,
  ExpandableSection,
  Header,
  Pagination,
  StatusIndicator,
} from '@cloudscape-design/components'
import { IdolListView } from 'components/idols/IdolListView'
import styled from 'styled-components'
import { GroupStatusBadge } from 'components/groups/GroupStatusBadge'
import React from 'react'
import * as awsui from '@cloudscape-design/design-tokens'
import { mediaQuerySpSize } from 'libs/dom/screen-size'

export interface GroupListViewWithExpandableIdolItem {
  name: string
  id: string
  status:
    | 'OPERATION_DELETED'
    | 'PRIVATE_ACTIVE'
    | 'PRIVATE_NOT_ACTIVE'
    | 'PUBLIC_ACTIVE'
    | 'PUBLIC_NOT_ACTIVE'
  idols: {
    name: string
    id: string
    status:
      | 'OPERATION_DELETED'
      | 'PRIVATE_ACTIVE'
      | 'PRIVATE_NOT_ACTIVE'
      | 'PUBLIC_ACTIVE'
      | 'PUBLIC_NOT_ACTIVE'
    groups: { id: string; name: string }[]
  }[]
}

const Center = styled.div`
  display: grid;
  place-items: center;
`

const PaginationContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 4px;
`

const Spacer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${awsui.spaceScaledL};
`

const Sticky = styled.div`
  position: sticky;
  top: -8px;
  z-index: 1000;

  @media ${mediaQuerySpSize} {
    z-index: unset;
    position: unset;
  }
`

export function GroupListViewWithExpandableIdol({
  groups,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
  isSelectable,
  onSelectionChange,
  selectedIdolId,
  hideGroupStatus,
}: {
  groups: GroupListViewWithExpandableIdolItem[]
  isLoading: boolean
  totalPages: number | null
  currentPage: number
  onPageChange: (page: number) => void
  isSelectable?: boolean
  onSelectionChange?: (selectedIdolId: string) => void
  selectedIdolId?: string
  hideHeader?: boolean
  hideGroupStatus?: boolean
}) {
  return (
    <Spacer>
      <Sticky>
        <Container
          header={
            <Header
              actions={
                <PaginationContainer>
                  <Pagination
                    currentPageIndex={currentPage}
                    pagesCount={totalPages ?? 0}
                    onChange={(d) => onPageChange(d.detail.currentPageIndex)}
                  />
                </PaginationContainer>
              }
            />
          }
          disableContentPaddings
        />
      </Sticky>
      {isLoading && (
        <Center>
          <StatusIndicator type="loading">Loading</StatusIndicator>
        </Center>
      )}
      {!isLoading && groups.length === 0 && (
        <Center>
          <Box textAlign="center" color="inherit">
            <b>結果が見つかりませんでした</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              まだグループが登録されていません。
            </Box>
          </Box>
        </Center>
      )}
      {!isLoading &&
        groups.map((group) => (
          <div key={group.id}>
            <ExpandableSection
              variant="stacked"
              headerText={group.name}
              headerInfo={
                !hideGroupStatus && <GroupStatusBadge status={group.status} />
              }
              headerCounter={group.idols.length.toString()}
            >
              <IdolListView
                idols={group.idols}
                isLoading={false}
                hideHeader
                onSelectionChange={onSelectionChange}
                selectedIdolId={selectedIdolId}
                isSelectable={isSelectable}
              />
            </ExpandableSection>
          </div>
        ))}
    </Spacer>
  )
}
