import { AppDispatch } from 'store/index'
import dayjs from 'dayjs'

export async function updateUserChekiIdolCount(
  params: {
    startDate: dayjs.Dayjs
    endDate: dayjs.Dayjs
  },
  dispatch: AppDispatch,
  headers?: Record<string, string>
) {}
