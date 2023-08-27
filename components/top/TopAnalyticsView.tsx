import { ChekiMonthIdolCount } from 'api-client/cheki'
import { Container, Header, SpaceBetween } from '@cloudscape-design/components'
import { AnalyticsChekiMonthIdolCount } from 'components/analytics/AnalyticsChekiMonthIdolCount'
import React from 'react'

export function TopAnalyticsView({
  chekiMonthIdolCount,
}: {
  chekiMonthIdolCount: ChekiMonthIdolCount[]
}) {
  return (
    <SpaceBetween size="xl" direction="vertical">
      <Container
        header={<Header variant="h2">過去のチェキ撮影枚数統計</Header>}
      >
        <AnalyticsChekiMonthIdolCount
          chekiMonthIdolCount={chekiMonthIdolCount}
        />
      </Container>
    </SpaceBetween>
  )
}
