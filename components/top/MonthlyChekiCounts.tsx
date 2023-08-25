import { Container, Header, SpaceBetween } from '@cloudscape-design/components'
import React from 'react'
import { ChekiByIdolAnalytics } from 'components/analytics/ChekiByIdolAnalytics'
import { AnalyticsChekiCount } from 'components/analytics/AnalyticsChekiCount'

export function MonthlyChekiCounts({
  chekiCounts,
}: {
  chekiCounts: {
    chekiCount: number
    idol?: {
      idolId: string
      idolName: string
    } | null
  }[]
}) {
  return (
    <SpaceBetween size="xl" direction="vertical">
      <Container header={<Header variant="h2">今月のチェキ撮影枚数</Header>}>
        <AnalyticsChekiCount chekiCounts={chekiCounts} />
      </Container>
      <Container header={<Header variant="h2">今月のチェキ統計</Header>}>
        <ChekiByIdolAnalytics chekiCounts={chekiCounts} />
      </Container>
    </SpaceBetween>
  )
}
