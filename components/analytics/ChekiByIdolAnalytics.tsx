import { Box } from '@cloudscape-design/components'
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
import React, { useMemo } from 'react'
import { nonNullable } from 'utils/array'

echarts.use([
  TreemapChart,
  TooltipComponent,
  AriaComponent,
  LabelLayout,
  SVGRenderer,
])

type GroupNode = {
  id: string
  name: string
  idols: Map<
    string,
    Pick<CurrentUserChekiIdolGroupCount, 'idol' | 'chekiCount'>
  >
}

type ChartOption = echarts.ComposeOption<
  TreemapSeriesOption | TooltipComponentOption | AriaComponentOption
>

const amountLabel = {
  fontSize: 13,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  lineHeight: 17,
} as const
const labelPadding = 4

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

export function ChekiByIdolAnalytics({
  chekiCounts,
}: {
  chekiCounts: CurrentUserChekiIdolGroupCount[]
}) {
  const isDarkTheme = useDarkTheme()
  const data = useMemo(() => {
    const groups = new Map<string, GroupNode>()
    for (const {
      idol,
      idolId,
      groupId,
      group: regulationGroup,
      chekiCount,
    } of chekiCounts) {
      if (chekiCount <= 0) continue

      const memberships = idol?.groups?.filter(nonNullable) ?? []
      const shotGroup =
        regulationGroup ??
        memberships.find((group) => group.groupId === groupId)
      const shotGroupId = groupId ?? shotGroup?.groupId
      let id = 'unaffiliated'
      let name = '所属グループなし'
      if (shotGroupId != null) {
        id = `group:${shotGroupId}`
        name = shotGroup?.groupName ?? 'グループ名不明'
      } else if (!idol) {
        id = 'unknown'
        name = '所属グループ不明'
      } else if (memberships.length > 1) {
        id = 'multiple'
        name = '複数グループ所属'
      } else if (memberships.length === 1) {
        id = `group:${memberships[0].groupId}`
        name = memberships[0].groupName
      }

      let group = groups.get(id)
      if (!group) {
        group = { id, name, idols: new Map() }
        groups.set(id, group)
      }

      // Shots with and without a regulation can resolve to the same group.
      group.idols.set(idolId, {
        idol,
        chekiCount: (group.idols.get(idolId)?.chekiCount ?? 0) + chekiCount,
      })
    }

    return [...groups.values()].map(({ id, name, idols }) => ({
      id,
      name,
      children: [...idols].map(([memberId, { idol, chekiCount }]) => ({
        id: `idol:${JSON.stringify([id, memberId])}`,
        name: idol?.idolName ?? '不明',
        value: chekiCount,
        itemStyle: { color: idolTileColor(idol?.idolId, isDarkTheme) },
        label: {
          rich: {
            amount: {
              ...amountLabel,
              // A fixed rich-text width hides the entire count if it does not fit.
              width: Math.ceil(
                echarts.format.getTextRect(
                  `${chekiCount} 枚`,
                  `${amountLabel.fontWeight} ${amountLabel.fontSize}px ${amountLabel.fontFamily}`,
                ).width,
              ),
            },
          },
        },
      })),
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
        color: isDarkTheme ? '#fff' : '#161d26',
      },
      labelLayout: ({ rect }) => {
        const fontSize = Math.max(
          10,
          Math.min(32, Math.floor(rect.width / 7), Math.floor(rect.height / 3)),
        )
        const textHeight = fontSize * 1.2 + amountLabel.lineHeight
        return {
          fontSize,
          dy: Math.max(0, (rect.height - textHeight) / 2 - labelPadding),
        }
      },
    },
  }

  return (
    <ReactECharts
      echarts={echarts}
      option={option}
      theme={isDarkTheme ? 'dark' : undefined}
      opts={{ renderer: 'svg' }}
      style={{ height: 'clamp(320px, 48vw, 560px)' }}
    />
  )
}
