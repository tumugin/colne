import {
  DateRangePicker,
  DateRangePickerProps,
} from '@cloudscape-design/components'
import React, { useCallback } from 'react'
import dayjs from 'dayjs'

export interface ColneDateRange {
  startISOString: string
  endISOString: string
}

export function ColneDataRangePicker({
  dateRange,
  onDateRangeChange,
}: {
  dateRange: ColneDateRange | null
  onDateRangeChange: (dateRange: ColneDateRange | null) => void
}) {
  const [value, setValue] = React.useState<DateRangePickerProps.Value | null>(
    dateRange
      ? {
          type: 'absolute',
          startDate: dayjs(dateRange.startISOString).format('YYYY-MM-DD'),
          endDate: dayjs(dateRange.endISOString).format('YYYY-MM-DD'),
        }
      : null,
  )

  const onChangeForListner = useCallback(
    (value: DateRangePickerProps.Value | null) => {
      if (value) {
        if (value.type === 'absolute') {
          onDateRangeChange({
            startISOString: dayjs(value.startDate).toISOString(),
            endISOString: dayjs(value.endDate).toISOString(),
          })
        } else {
          onDateRangeChange({
            startISOString: dayjs()
              .subtract(value.amount, value.unit)
              .toISOString(),
            endISOString: dayjs().toISOString(),
          })
        }
      } else {
        onDateRangeChange(null)
      }
    },
    [onDateRangeChange],
  )

  return (
    <DateRangePicker
      onChange={({ detail }) => {
        setValue(detail.value)
        onChangeForListner(detail.value)
      }}
      value={value}
      relativeOptions={[
        {
          key: 'previous-7-days',
          amount: 7,
          unit: 'day',
          type: 'relative',
        },
        {
          key: 'previous-1-month',
          amount: 1,
          unit: 'month',
          type: 'relative',
        },
        {
          key: 'previous-6-months',
          amount: 6,
          unit: 'month',
          type: 'relative',
        },
        {
          key: 'previous-1-year',
          amount: 1,
          unit: 'year',
          type: 'relative',
        },
      ]}
      isValidRange={(range) => {
        if (range?.type === 'absolute') {
          const [startDateWithoutTime] = range.startDate.split('T')
          const [endDateWithoutTime] = range.endDate.split('T')
          if (!startDateWithoutTime || !endDateWithoutTime) {
            return {
              valid: false,
              errorMessage:
                'The selected date range is incomplete. Select a start and end date for the date range.',
            }
          }
          if (dayjs(range.startDate).diff(dayjs(range.endDate)).valueOf() > 0) {
            return {
              valid: false,
              errorMessage:
                'The selected date range is invalid. The start date must be before the end date.',
            }
          }
        }
        return { valid: true }
      }}
      i18nStrings={{
        todayAriaLabel: '今日',
        nextMonthAriaLabel: '翌月',
        previousMonthAriaLabel: '先月',
        customRelativeRangeDurationLabel: '期間',
        customRelativeRangeDurationPlaceholder: '期間を入力',
        customRelativeRangeOptionLabel: 'カスタム範囲',
        customRelativeRangeOptionDescription: '過去のカスタム範囲を設定する',
        customRelativeRangeUnitLabel: '時間単位',
        formatRelativeRange: (e) => {
          const japaneseUnit = {
            second: '秒間',
            minute: '分間',
            hour: '時間',
            day: '日間',
            week: '週間',
            month: 'ヶ月',
            year: '年',
          }
          return `直近 ${e.amount}${japaneseUnit[e.unit]}`
        },
        formatUnit: (e, n) => (1 === n ? e : `${e}s`),
        dateTimeConstraintText:
          '範囲は6～30日。日付はYYYY/MM/DDを使用。時刻は24時間表示。',
        relativeModeTitle: '相対範囲',
        absoluteModeTitle: '絶対範囲',
        relativeRangeSelectionHeading: '範囲を選択',
        startDateLabel: '開始日',
        endDateLabel: '終了日',
        startTimeLabel: '開始時刻',
        endTimeLabel: '終了時刻',
        clearButtonLabel: 'クリアする',
        cancelButtonLabel: 'キャンセル',
        applyButtonLabel: '反映する',
      }}
      dateOnly
      placeholder="日付の範囲でフィルタする"
    />
  )
}
