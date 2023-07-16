import { AddOrUpdateChekiParamsInput } from 'graphql/generated/client'
import { createGraphQLSDK } from 'graphql/client'
import dayjs from 'dayjs'

const invalidateTag = ['cheki']

export async function addCheki(
  params: AddOrUpdateChekiParamsInput,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({ headers, next: { tags: invalidateTag } })
  await sdk.AddCheki({ cheki: params })
}

export interface CurrentUserChekiIdolCount {
  chekiCount: number
  idol?: {
    idolId: string
    idolName: string
  } | null
}

export async function getCurrentUserChekiIdolCount(
  params: {
    startDate: dayjs.Dayjs
    endDate: dayjs.Dayjs
  },
  headers?: Headers,
): Promise<CurrentUserChekiIdolCount[]> {
  const sdk = createGraphQLSDK({ headers, next: { tags: invalidateTag } })
  const result = await sdk.GetUserChekiIdolCount(
    {
      chekiShotAtStart: params.startDate.toISOString(),
      chekiShotAtEnd: params.endDate.toISOString(),
    },
    headers,
  )
  return result.currentUserChekis.getUserChekiIdolCount
}

export function createThisMonthDateRange(today: dayjs.Dayjs) {
  return {
    startDate: today.startOf('month'),
    endDate: today.endOf('month'),
  }
}

export async function getIdolChekisWithDateRange(
  idolId: string,
  dateRange: { startDate: dayjs.Dayjs; endDate: dayjs.Dayjs },
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({ headers, next: { tags: invalidateTag } })
  const result = await sdk.GetIdolChekisByDateRangeAndIdolId(
    {
      chekiShotAtStart: dateRange.startDate.toISOString(),
      chekiShotAtEnd: dateRange.endDate.toISOString(),
      idolId,
    },
    headers,
  )
  return result.currentUserChekis.getUserChekis
}
