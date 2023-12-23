import { ChekiMonthIdolCount } from 'api-client/cheki'
import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { BarChart, Box } from '@cloudscape-design/components'
import minMax from 'dayjs/plugin/minMax'

dayjs.extend(minMax)

export function AnalyticsChekiMonthIdolCount({
  chekiMonthIdolCount,
}: {
  chekiMonthIdolCount: ChekiMonthIdolCount[]
}) {
  const idols = useMemo(
    () =>
      [...new Set(chekiMonthIdolCount.map((v) => v.idolId))].map((idolId) => ({
        idolId: idolId,
        name: chekiMonthIdolCount.find((v) => v.idolId === idolId)?.idol
          ?.idolName,
      })),
    [chekiMonthIdolCount],
  )
  const allParsedDates = useMemo(
    () =>
      chekiMonthIdolCount.map((c) =>
        dayjs()
          .set('year', c.chekiShotAtMonth.year)
          .set('month', c.chekiShotAtMonth.month - 1)
          .set('date', 1)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0),
      ),
    [chekiMonthIdolCount],
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
      idols.map((v) => ({
        title: v.name ?? '',
        type: 'bar' as const,
        data: dateRangeByMonth.map((date) => ({
          x: date.toDate(),
          y:
            chekiMonthIdolCount.find(
              (c) =>
                c.idolId === v.idolId &&
                c.chekiShotAtMonth.year === date.year() &&
                c.chekiShotAtMonth.month === date.month() + 1,
            )?.chekiCount ?? 0,
        })),
      })),
    [chekiMonthIdolCount, dateRangeByMonth, idols],
  )

  return (
    <BarChart
      series={series}
      xTitle="月"
      yTitle="撮影枚数"
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
      horizontalBars
      hideFilter
    />
  )
}
