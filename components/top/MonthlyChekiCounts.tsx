import {
  Button,
  Container,
  Grid,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components'
import React, { useMemo } from 'react'
import { ChekiByIdolAnalytics } from 'components/analytics/ChekiByIdolAnalytics'
import { AnalyticsChekiCount } from 'components/analytics/AnalyticsChekiCount'
import { AnalyticsTotalChekiCount } from 'components/analytics/AnalyticsTotalChekiCount'
import { AnalyticsTopIdol } from 'components/analytics/AnalyticsTopIdol'
import { chekiAddPath } from 'utils/urls'
import { onFollowNextLink } from 'utils/router'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const totalChekiCount = useMemo(
    () => chekiCounts.reduce((acc, cur) => acc + (cur?.chekiCount ?? 0), 0),
    [chekiCounts],
  )
  const sortedChekiCounts = useMemo(
    () => [...chekiCounts].sort((a, b) => b.chekiCount - a.chekiCount),
    [chekiCounts],
  )

  return (
    <SpaceBetween size="xl" direction="vertical">
      <Container
        header={
          <Header
            variant="h2"
            actions={
              <Button
                href={chekiAddPath}
                variant="primary"
                onFollow={(e) => onFollowNextLink(router, e, chekiAddPath)}
              >
                チェキを追加する
              </Button>
            }
          >
            今月のチェキ撮影枚数
          </Header>
        }
      >
        <AnalyticsChekiCount chekiCounts={chekiCounts} />
      </Container>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 6 } },
          { colspan: { default: 12, xs: 6 } },
        ]}
      >
        <Container
          header={<Header variant="h2">今月の累計チェキ撮影枚数</Header>}
        >
          <AnalyticsTotalChekiCount totalChekiCount={totalChekiCount} />
        </Container>
        <Container
          header={<Header variant="h2">今月一番撮影されたアイドル</Header>}
        >
          <AnalyticsTopIdol
            idol={sortedChekiCounts[0]?.idol ?? null}
            chekiCount={sortedChekiCounts[0]?.chekiCount ?? null}
          />
        </Container>
      </Grid>
      <Container header={<Header variant="h2">今月のチェキ統計</Header>}>
        <ChekiByIdolAnalytics chekiCounts={chekiCounts} />
      </Container>
    </SpaceBetween>
  )
}
