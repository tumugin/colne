import {
  DateRangePicker,
  DateRangePickerProps,
} from '@cloudscape-design/components'
import React, { useEffect } from 'react'
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
          startDate: dateRange.startISOString,
          endDate: dateRange.endISOString,
        }
      : null
  )

  useEffect(() => {
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
  }, [onDateRangeChange, value])

  return (
    <DateRangePicker
      onChange={({ detail }) => setValue(detail.value)}
      value={value}
      relativeOptions={[
        {
          key: 'previous-5-minutes',
          amount: 5,
          unit: 'minute',
          type: 'relative',
        },
        {
          key: 'previous-30-minutes',
          amount: 30,
          unit: 'minute',
          type: 'relative',
        },
        {
          key: 'previous-1-hour',
          amount: 1,
          unit: 'hour',
          type: 'relative',
        },
        {
          key: 'previous-6-hours',
          amount: 6,
          unit: 'hour',
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
        todayAriaLabel: 'Today',
        nextMonthAriaLabel: 'Next month',
        previousMonthAriaLabel: 'Previous month',
        customRelativeRangeDurationLabel: 'Duration',
        customRelativeRangeDurationPlaceholder: 'Enter duration',
        customRelativeRangeOptionLabel: 'Custom range',
        customRelativeRangeOptionDescription: 'Set a custom range in the past',
        customRelativeRangeUnitLabel: 'Unit of time',
        formatRelativeRange: (e) => {
          const n = 1 === e.amount ? e.unit : `${e.unit}s`
          return `Last ${e.amount} ${n}`
        },
        formatUnit: (e, n) => (1 === n ? e : `${e}s`),
        dateTimeConstraintText:
          'Range is 6 to 30 days. For date, use YYYY/MM/DD. For time, use 24 hr format.',
        relativeModeTitle: 'Relative range',
        absoluteModeTitle: 'Absolute range',
        relativeRangeSelectionHeading: 'Choose a range',
        startDateLabel: 'Start date',
        endDateLabel: 'End date',
        startTimeLabel: 'Start time',
        endTimeLabel: 'End time',
        clearButtonLabel: 'Clear and dismiss',
        cancelButtonLabel: 'Cancel',
        applyButtonLabel: 'Apply',
      }}
      dateOnly
      placeholder="Filter by a date and time range"
    />
  )
}
