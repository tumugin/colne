import {
  Box,
  Cards,
  Header,
  SpaceBetween,
  Toggle,
} from '@cloudscape-design/components'
import React from 'react'
import styled from 'styled-components'

interface StatItem {
  name: string
  value: number | string
  unitName?: string
  smallText?: boolean
  defaultHidden?: boolean
}

const BottomAlignText = styled(SpaceBetween)`
  align-items: flex-end;
`

export function IdolChekiStatsView({
  isLoading,
  stats,
}: {
  isLoading: boolean
  stats: StatItem[]
}) {
  const [showHiddenStats, setShowHiddenStats] = React.useState<{
    [name: string]: boolean | undefined
  }>({})

  return (
    <Box>
      <Cards
        cardDefinition={{
          header: (item) => (
            <SpaceBetween size="m" direction="horizontal">
              {item.name}
              <Toggle
                onChange={({ detail }) =>
                  setShowHiddenStats((s) => ({
                    ...s,
                    [item.name]: detail.checked,
                  }))
                }
                checked={
                  showHiddenStats[item.name] !== undefined
                    ? showHiddenStats[item.name] ?? false
                    : item.defaultHidden ?? false
                }
              >
                非表示にする
              </Toggle>
            </SpaceBetween>
          ),
          sections: [
            {
              content: (item) => (
                <BottomAlignText size="xs" direction="horizontal">
                  <Box fontSize={item.smallText ? 'heading-xl' : 'display-l'}>
                    {(
                      showHiddenStats[item.name] !== undefined
                        ? showHiddenStats[item.name] ?? false
                        : item.defaultHidden ?? false
                    )
                      ? '*******'
                      : item.value}
                  </Box>
                  {item.unitName && (
                    <Box fontSize="heading-xl">{item.unitName}</Box>
                  )}
                </BottomAlignText>
              ),
            },
          ],
        }}
        cardsPerRow={[
          { cards: 1 },
          { minWidth: 500, cards: 2 },
          { minWidth: 700, cards: 3 },
          { minWidth: 1000, cards: 4 },
        ]}
        items={stats}
        loadingText="読み込み中..."
        loading={isLoading}
      />
    </Box>
  )
}
