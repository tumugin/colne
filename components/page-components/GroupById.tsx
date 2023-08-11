'use client'

import { Group } from 'api-client/group'
import { ContentLayout, SpaceBetween } from '@cloudscape-design/components'
import { GroupDetailView } from 'components/groups/GroupDetailView'
import { GroupIdolList } from 'components/groups/GroupIdolList'
import { nonNullable } from 'utils/array'

export function GroupById({ group }: { group: Group }) {
  return (
    <ContentLayout>
      <SpaceBetween size="xxl">
        <GroupDetailView group={group} />
        <GroupIdolList idols={group.idols.filter(nonNullable)} />
      </SpaceBetween>
    </ContentLayout>
  )
}
