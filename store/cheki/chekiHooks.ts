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

export async function updateIdolChekisWithDateRange(
  idolId: string,
  dateRange: { startDate: dayjs.Dayjs; endDate: dayjs.Dayjs },
  dispatch: AppDispatch,
  headers?: Record<string, string>
) {
  await dispatch(
    chekiSlice.actions.updateIdolChekis({
      [idolId]: {
        isLoaded: false,
        dateTimeRangeStart: dateRange.startDate.toISOString(),
        dateTimeRangeEnd: dateRange.endDate.toISOString(),
        chekis: [],
      },
    })
  )
  const result = await colneGraphQLSdk.GetIdolChekisByDateRangeAndIdolId(
    {
      chekiShotAtStart: dateRange.startDate.toISOString(),
      chekiShotAtEnd: dateRange.endDate.toISOString(),
      idolId,
    },
    headers
  )
  await dispatch(
    chekiSlice.actions.updateIdolChekis({
      [idolId]: {
        isLoaded: true,
        dateTimeRangeStart: dateRange.startDate.toISOString(),
        dateTimeRangeEnd: dateRange.endDate.toISOString(),
        chekis: result.currentUserChekis.getUserChekis.map((p) => ({
          chekiId: p.chekiId,
          idolId: p.idolId ?? undefined,
          regulationId: p.regulationId ?? undefined,
          chekiQuantity: p.chekiQuantity,
          chekiShotAt: p.chekiShotAt,
          regulation: p.regulation
            ? {
                regulationId: p.regulation.regulationId,
                groupId: p.regulation.groupId,
                regulationName: p.regulation.regulationName,
                regulationComment: p.regulation.regulationComment,
                regulationUnitPrice: p.regulation.regulationUnitPrice,
                regulationStatus: p.regulation.regulationStatus,
                group: p.regulation.group
                  ? {
                      groupId: p.regulation.group.groupId,
                      groupName: p.regulation.group.groupName,
                    }
                  : undefined,
              }
            : undefined,
        })),
      },
    })
  )
}
