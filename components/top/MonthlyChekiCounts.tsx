import {
  Button,
  Container,
  Grid,
  Header,
  SpaceBetween,
  Toggle,
} from '@cloudscape-design/components'
import React, { useMemo, useState } from 'react'
import { ChekiByIdolAnalytics } from 'components/analytics/ChekiByIdolAnalytics'
import { AnalyticsChekiCount } from 'components/analytics/AnalyticsChekiCount'
import { AnalyticsTotalChekiCount } from 'components/analytics/AnalyticsTotalChekiCount'
import { AnalyticsTopIdol } from 'components/analytics/AnalyticsTopIdol'
import { chekiAddPath } from 'utils/urls'
import { onFollowNextLink } from 'utils/router'
import { useRouter } from 'next/navigation'
import { AnalyticsTotalChekiPrice } from 'components/analytics/AnalyticsTotalChekiPrice'

export function MonthlyChekiCounts({
  chekiCounts,
}: {
  chekiCounts: {
    chekiCount: number
    totalPrice: number
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
  const totalChekiPrice = useMemo(
    () =>
      chekiCounts
        .map((v) => v.totalPrice)
        .reduce((acc, cur) => acc + (cur ?? 0), 0),
    [chekiCounts],
  )
  const [totalChekiPriceHidden, setTotalChekiPriceHidden] = useState(true)

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
          { colspan: { default: 12, m: 4, xs: 6 } },
          { colspan: { default: 12, m: 4, xs: 6 } },
          { colspan: { default: 12, m: 4, xs: 12 } },
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
        <Container
          header={
            <Header
              variant="h2"
              actions={
                <Toggle
                  checked={totalChekiPriceHidden}
                  onChange={() => setTotalChekiPriceHidden((p) => !p)}
                />
              }
            >
              今月の累計金額
            </Header>
          }
        >
          <AnalyticsTotalChekiPrice
            totalPrice={totalChekiPrice}
            hidden={totalChekiPriceHidden}
          />
        </Container>
      </Grid>
      <Container header={<Header variant="h2">今月のチェキ統計</Header>}>
        <ChekiByIdolAnalytics chekiCounts={chekiCounts} />
      </Container>
    </SpaceBetween>
  )
}
