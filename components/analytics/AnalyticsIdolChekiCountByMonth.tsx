import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { BarChart, Box } from '@cloudscape-design/components'
import { ChekiMonthCountByIdolItem } from 'api-client/cheki'
import minMax from 'dayjs/plugin/minMax'

dayjs.extend(minMax)

export function AnalyticsIdolChekiCountByMonth({
  isLoading,
  stats,
}:
  | {
      isLoading: true
      stats: ChekiMonthCountByIdolItem[]
    }
  | { isLoading: false; stats: undefined | ChekiMonthCountByIdolItem[] }) {
  const allParsedDates = useMemo(
    () =>
      (stats ?? []).map((c) =>
        dayjs()
          .set('year', c.month.year)
          .set('month', c.month.month - 1)
          .set('date', 1)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0),
      ),
    [stats],
  )
  const minParsedDate = useMemo(
    () => dayjs.min(allParsedDates),
    [allParsedDates],
  )
  const maxParsedDate = useMemo(
    () => dayjs.max(allParsedDates),
    [allParsedDates],
  )
  const dateRangeByMonth = useMemo(() => {
    const result: dayjs.Dayjs[] = []
    let date = minParsedDate

    if (date === null) {
      return []
    }

    while (date.isBefore(maxParsedDate) || date.isSame(maxParsedDate)) {
      result.push(date)
      date = date.add(1, 'month')
    }

    return result
  }, [maxParsedDate, minParsedDate])

  const series = useMemo(
    () =>
      [
        {
          title: '撮影枚数',
          type: 'bar' as const,
          data: dateRangeByMonth.map((date) => ({
            x: date.toDate(),
            y:
              (stats ?? []).find(
                (c) =>
                  c.month.year === date.year() &&
                  c.month.month === date.month() + 1,
              )?.count ?? 0,
          })),
        },
        {
          title: '平均枚数',
          type: 'threshold',
          y:
            (stats ?? []).reduce((sum, c) => sum + c.count, 0) /
            dateRangeByMonth.length,
        },
      ] as const,
    [dateRangeByMonth, stats],
  )

  const xDomain = useMemo(
    () =>
      dateRangeByMonth
        .sort((a, b) => a.diff(b))
        .map((v) => v.toDate()),
    [dateRangeByMonth],
  )

  return (
    <BarChart
      statusType={isLoading ? 'loading' : 'finished'}
      loadingText="読み込み中..."
      series={series}
      xTitle="月"
      yTitle="撮影枚数"
      xDomain={xDomain}
      empty={
        <Box textAlign="center" color="inherit">
          <b>データなし</b>
          <Box variant="p" color="inherit">
            撮影されたチェキはありません
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>該当データなし</b>
          <Box variant="p" color="inherit">
            該当する撮影されたチェキはありません
          </Box>
        </Box>
      }
      xTickFormatter={(date) => dayjs(date).format('YYYY年MM月')}
      stackedBars
      hideLegend
      hideFilter
      height={300}
    />
  )
}
