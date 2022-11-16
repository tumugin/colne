import { AppDispatch } from 'store/index'
import dayjs from 'dayjs'
import { colneGraphQLSdk } from 'graphql/client'
import { chekiSlice } from './chekiStore'

export async function updateCurrentUserChekiIdolCount(
  params: {
    startDate: dayjs.Dayjs
    endDate: dayjs.Dayjs
  },
  dispatch: AppDispatch,
  headers?: Record<string, string>
) {
  const result = await colneGraphQLSdk.GetUserChekiIdolCount(
    {
      chekiShotAtStart: params.startDate.toISOString(),
      chekiShotAtEnd: params.endDate.toISOString(),
    },
    headers
  )
  await dispatch(
    chekiSlice.actions.updateCurrentUserChekiIdolCount(
      result.currentUserChekis.getUserChekiIdolCount.map((p) => ({
        chekiCount: p.chekiCount,
        idol: p.idol ?? null,
      }))
    )
  )
}

export function createThisMonthDateRange(today: dayjs.Dayjs) {
  return {
    startDate: today.startOf('month'),
    endDate: today.endOf('month'),
  }
}
