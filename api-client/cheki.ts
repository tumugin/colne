import {
  AddOrUpdateChekiParamsInput,
  GroupStatus,
} from 'graphql/generated/client'
import { createGraphQLSDK } from 'graphql/client'
import dayjs from 'dayjs'

export async function addCheki(
  params: AddOrUpdateChekiParamsInput,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({ headers, cache: 'no-store' })
  await sdk.AddCheki({ cheki: params })
}

export interface CurrentUserChekiIdolCount {
  chekiCount: number
  totalPrice: number
  idol?: {
    idolId: string
    idolName: string
  } | null
}

export async function deleteCheki(
  params: { chekiId: string },
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({ headers, cache: 'no-store' })
  await sdk.DeleteCheki(params, headers)
}

export async function getCurrentUserChekiIdolCount(
  params: {
    startDate: dayjs.Dayjs
    endDate: dayjs.Dayjs
  },
  headers?: Headers,
): Promise<CurrentUserChekiIdolCount[]> {
  const sdk = createGraphQLSDK({ headers, cache: 'no-store' })
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

export interface IdolCheki {
  chekiCreatedAt: string
  chekiId: string
  chekiQuantity: number
  chekiShotAt: string
  chekiUpdatedAt: string
  idolId?: string | null
  regulationId?: string | null
  userId: string
  regulation?: {
    groupId: string
    regulationComment: string
    regulationCreatedAt: string
    regulationId: string
    regulationName: string
    regulationStatus: string
    regulationUnitPrice: number
    regulationUpdatedAt: string
    userId?: string | null
    group?: {
      groupCreatedAt: string
      groupId: string
      groupName: string
      groupStatus: GroupStatus
      groupUpdatedAt: string
    } | null
  } | null
}

export async function getIdolChekisWithDateRange(
  idolId: string,
  dateRange: { startDate: dayjs.Dayjs; endDate: dayjs.Dayjs },
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({ headers, cache: 'no-store' })
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

export interface ChekiMonthIdolCount {
  chekiCount: number
  idolId: string
  chekiShotAtMonth: {
    baseTimezone: string
    year: number
    month: number
  }
  idol?: { idolName: string } | null
}

export async function getChekiMonthIdolCount(
  baseTimezone: string,
): Promise<ChekiMonthIdolCount[]> {
  const sdk = createGraphQLSDK({ cache: 'no-store' })
  const result = await sdk.GetChekiMonthIdolCount({
    baseTimezone,
  })
  return result.currentUserChekis.getChekiMonthIdolCount
}
