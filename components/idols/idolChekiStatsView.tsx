import {
  Box,
  Cards,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components'
import React from 'react'

interface StatItem {
  name: string
  value: number
  unitName: string
}

export function IdolChekiStatsView({
  isLoading,
  stats,
}: {
  isLoading: boolean
  stats: StatItem[]
}) {
  return (
    <Box>
      <Cards
        cardDefinition={{
          header: (item) => item.name,
          sections: [
            {
              content: (item) => (
                <SpaceBetween size="xs" direction="horizontal">
                  <Box fontSize="display-l">{item.value}</Box>
                  <Box fontSize="heading-xl">{item.unitName}</Box>
                </SpaceBetween>
              ),
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 3 }]}
        items={stats}
        loadingText="読み込み中..."
        loading={isLoading}
        header={
          <Header actions={null} variant="h2">
            アイドルのチェキ統計
          </Header>
        }
      />
    </Box>
  )
}
