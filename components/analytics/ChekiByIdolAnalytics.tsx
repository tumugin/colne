import { Box, Button, Container, Header } from '@cloudscape-design/components'
import type { CurrentUserChekiIdolGroupCount } from 'api-client/cheki'
import { TreemapChart, type TreemapSeriesOption } from 'echarts/charts'
import {
  AriaComponent,
  TooltipComponent,
  type AriaComponentOption,
  type TooltipComponentOption,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { LabelLayout } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'
import ReactECharts from 'echarts-for-react/lib/core'
import { useDarkTheme } from 'libs/dom/useDarkTheme'
import React, { useMemo, useState } from 'react'

echarts.use([
  TreemapChart,
  TooltipComponent,
  AriaComponent,
  LabelLayout,
  SVGRenderer,
])

type ChartOption = echarts.ComposeOption<
  TreemapSeriesOption | TooltipComponentOption | AriaComponentOption
>

const labelGap = 4
const amountLabel = {
  fontSize: 16,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  lineHeight: 20 + labelGap,
} as const
const amountFont = `${amountLabel.fontWeight} ${amountLabel.fontSize}px ${amountLabel.fontFamily}`
const labelPadding = 4
const nameFontSizes = [40, 36, 32, 28, 24, 20, 16, 14, 12]
const minimumNameFontSize = 10

function tileLabelHeight(nameFontSize: number) {
  return nameFontSize * 1.2 + amountLabel.lineHeight
}

function idolTileColor(idolId: string | undefined, isDarkTheme: boolean) {
  if (!idolId) return isDarkTheme ? '#414853' : '#d9dde4'

  // Give each ID a consistent hue across charts and reporting periods.
  let hash = 2166136261
  for (let index = 0; index < idolId.length; index++) {
    hash = Math.imul(hash ^ idolId.charCodeAt(index), 16777619)
  }

  const mixedHash = Math.imul(hash, 0x9e3779b1) >>> 0
  const hue = (mixedHash / 0x100000000) * 360
  return `hsl(${hue}, ${isDarkTheme ? '55%, 30%' : '56%, 76%'})`
}

function createIdolTile(
  { groupId, idolId, idol, chekiCount }: CurrentUserChekiIdolGroupCount,
  isDarkTheme: boolean,
) {
  const countText = `${chekiCount} 枚`
  const countWidth = echarts.format.getTextRect(countText, amountFont).width

  return {
    id: `idol:${JSON.stringify([groupId, idolId])}`,
    name: idol?.idolName ?? '不明',
    value: chekiCount,
    itemStyle: { color: idolTileColor(idol?.idolId, isDarkTheme) },
    label: {
      rich: {
        // An explicit token width lets ECharts hide the whole count if it cannot fit.
        amount: {
          ...amountLabel,
          padding: [labelGap, 0, 0, 0],
          width: Math.ceil(countWidth),
        },
      },
    },
  }
}

export function ChekiByIdolAnalytics({
  chekiCounts,
  title,
}: {
  chekiCounts: CurrentUserChekiIdolGroupCount[]
  title: string
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            chekiCounts.length > 0 && (
              <Button onClick={() => setIsExpanded((expanded) => !expanded)}>
                {isExpanded ? '元の高さに戻す' : '縦に拡大'}
              </Button>
            )
          }
        >
          {title}
        </Header>
      }
    >
      <ChekiByIdolChart chekiCounts={chekiCounts} isExpanded={isExpanded} />
    </Container>
  )
}

function ChekiByIdolChart({
  chekiCounts,
  isExpanded,
}: {
  chekiCounts: CurrentUserChekiIdolGroupCount[]
  isExpanded: boolean
}) {
  const isDarkTheme = useDarkTheme()
  const data = useMemo(() => {
    const groups = new Map<string | null, CurrentUserChekiIdolGroupCount[]>()

    for (const row of chekiCounts) {
      const group = groups.get(row.groupId)

      if (group) {
        group.push(row)
      } else {
        groups.set(row.groupId, [row])
      }
    }

    return [...groups].map(([groupId, rows]) => ({
      id: groupId === null ? 'unknown' : `group:${groupId}`,
      name: rows[0].group?.groupName ?? 'グループ不明',
      children: rows.map((row) => createIdolTile(row, isDarkTheme)),
    }))
  }, [chekiCounts, isDarkTheme])

  if (data.length === 0) {
    return (
      <Box textAlign="center" color="inherit">
        <b>データなし</b>
        <Box variant="p" color="inherit">
          今月撮影されたチェキはありません
        </Box>
      </Box>
    )
  }

  const option: ChartOption = {
    backgroundColor: 'transparent',
    aria: { enabled: true },
    tooltip: {
      trigger: 'item',
      confine: true,
      valueFormatter: (value) =>
        value == null ? '' : `${value.toLocaleString('ja-JP')} 枚`,
    },
    series: {
      type: 'treemap',
      name: 'チェキ撮影枚数',
      data,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      visibleMin: 0,
      itemStyle: {
        gapWidth: 1,
        borderColor: isDarkTheme ? '#232833' : '#e8ecf2',
      },
      levels: [
        { itemStyle: { gapWidth: 4 } },
        {
          upperLabel: {
            show: true,
            height: 18,
            padding: [0, 5],
            fontSize: 11,
            fontWeight: 'bold',
            color: isDarkTheme ? '#f1f3f5' : '#161d26',
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: isDarkTheme ? '#303744' : '#e8ecf2',
          },
        },
      ],
      label: {
        formatter: '{b}\n{amount|{c} 枚}',
        overflow: 'truncate',
        position: 'insideTop',
        align: 'center',
        verticalAlign: 'top',
        padding: labelPadding,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: isDarkTheme ? '#fff' : '#161d26',
      },
      labelLayout: ({ rect: { width, height }, text }) => {
        const [name] = text.split('\n', 1)
        const availableWidth = width - 2 * labelPadding
        const availableHeight = height - 2 * labelPadding
        const fontSize =
          nameFontSizes.find((size) => {
            if (tileLabelHeight(size) > availableHeight) {
              return false
            }

            const nameWidth = echarts.format.getTextRect(
              name,
              `bold ${size}px sans-serif`,
            ).width
            return nameWidth <= availableWidth
          }) ?? minimumNameFontSize

        // ECharts top-aligns rich text, so center the two lines within the tile.
        const freeHeight = availableHeight - tileLabelHeight(fontSize)
        return { fontSize, dy: Math.max(0, freeHeight / 2) }
      },
    },
  }

  return (
    <ReactECharts
      echarts={echarts}
      option={option}
      theme={isDarkTheme ? 'dark' : undefined}
      opts={{ renderer: 'svg' }}
      style={{
        height: isExpanded
          ? 'clamp(640px, 96vw, 1120px)'
          : 'clamp(320px, 48vw, 560px)',
      }}
    />
  )
}
