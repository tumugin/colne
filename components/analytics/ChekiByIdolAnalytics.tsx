import { ResponsiveContainer, Treemap } from 'recharts'
import { useMemo } from 'react'
import {
  colorChartsRed300,
  colorChartsRed400,
  colorChartsRed500,
  colorChartsRed600,
  colorChartsRed700,
  colorChartsOrange300,
  colorChartsOrange400,
  colorChartsOrange500,
  colorChartsOrange600,
  colorChartsOrange700,
  colorChartsYellow300,
  colorChartsYellow400,
  colorChartsYellow500,
  colorChartsYellow600,
  colorChartsYellow700,
  colorChartsGreen300,
  colorChartsGreen400,
  colorChartsGreen500,
  colorChartsGreen600,
  colorChartsGreen700,
  colorChartsTeal300,
  colorChartsTeal400,
  colorChartsTeal500,
  colorChartsTeal600,
  colorChartsTeal700,
  colorChartsBlue1300,
  colorChartsBlue1400,
  colorChartsBlue1500,
  colorChartsBlue1600,
  colorChartsBlue1700,
  colorChartsBlue1800,
  colorChartsBlue1900,
  colorChartsPurple300,
  colorChartsPurple400,
  colorChartsPurple500,
  colorChartsPurple600,
  colorChartsPurple700,
  colorChartsPink300,
  colorChartsPink400,
  colorChartsPink500,
  colorChartsPink600,
  colorChartsPink700,
  colorTextInteractiveActive,
  colorBorderDividerDefault,
} from '@cloudscape-design/design-tokens'

export function ChekiByIdolAnalytics({
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
  const sortedChekiCounts = useMemo(
    () => chekiCounts.sort((a, b) => a.chekiCount - b.chekiCount),
    [chekiCounts],
  )
  const totalChekiCount = useMemo(
    () =>
      sortedChekiCounts.reduce((acc, cur) => acc + (cur?.chekiCount ?? 0), 0),
    [sortedChekiCounts],
  )

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap
        dataKey="size"
        data={[
          {
            name: 'チェキ',
            children: sortedChekiCounts.map((chekiCount) => ({
              name: `${chekiCount.idol?.idolName ?? '不明'}(${
                chekiCount.chekiCount
              })`,
              size: (chekiCount.chekiCount / totalChekiCount) * 100,
            })),
          },
        ]}
        isAnimationActive={false}
        // @ts-ignore
        content={<CustomTreemap colors={COLORS} />}
      />
    </ResponsiveContainer>
  )
}

const COLORS = [
  colorChartsRed300,
  colorChartsRed400,
  colorChartsRed500,
  colorChartsRed600,
  colorChartsRed700,
  colorChartsOrange300,
  colorChartsOrange400,
  colorChartsOrange500,
  colorChartsOrange600,
  colorChartsOrange700,
  colorChartsYellow300,
  colorChartsYellow400,
  colorChartsYellow500,
  colorChartsYellow600,
  colorChartsYellow700,
  colorChartsGreen300,
  colorChartsGreen400,
  colorChartsGreen500,
  colorChartsGreen600,
  colorChartsGreen700,
  colorChartsTeal300,
  colorChartsTeal400,
  colorChartsTeal500,
  colorChartsTeal600,
  colorChartsTeal700,
  colorChartsBlue1300,
  colorChartsBlue1400,
  colorChartsBlue1500,
  colorChartsBlue1600,
  colorChartsBlue1700,
  colorChartsBlue1800,
  colorChartsBlue1900,
  colorChartsPurple300,
  colorChartsPurple400,
  colorChartsPurple500,
  colorChartsPurple600,
  colorChartsPurple700,
  colorChartsPink300,
  colorChartsPink400,
  colorChartsPink500,
  colorChartsPink600,
  colorChartsPink700,
]

function CustomTreemap({
  x,
  y,
  width,
  height,
  index,
  depth,
  name,
  colors,
  root,
}: {
  x: number
  y: number
  width: number
  height: number
  index: number
  depth: number
  name?: string
  colors: string[]
  root: {
    children: unknown[]
  }
}) {
  const fontSize = width / (name?.length ?? 1)

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors[
            Math.floor((index / root.children.length) * colors.length)
          ],
          stroke: colorBorderDividerDefault,
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      <text
        x={x + width / 2}
        y={y + height / 2 + fontSize / 2}
        width={width}
        textAnchor="middle"
        fill={colorTextInteractiveActive}
        fontSize={fontSize}
      >
        {name}
      </text>
    </g>
  )
}
