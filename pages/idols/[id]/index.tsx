import { NextPage } from 'next'
import { ContentLayout, SpaceBetween } from '@cloudscape-design/components'
import { getRequestHeaderFromContext } from 'utils/headers'
import { useAppSelector, wrapper } from 'store'
import { getIdol } from 'store/idol/idolHooks'
import {
  ErrorAwarePageProps,
  handleExceptionAndReturnErrorAwarePageProps,
} from 'utils/error-aware-page-utils'
import Error from 'next/error'
import { IdolDetailsView } from 'components/idols/IdolDetailsView'
import { IdolChekiStats } from 'components/idols/idolChekiStats'
import React, { useCallback } from 'react'
import { ColneDateRange } from 'components/parts/ColneDataRangePicker'
import { asSingleStringParam } from 'utils/query-params'
import dayjs from 'dayjs'
import { updateIdolChekisWithDateRange } from 'store/cheki/chekiHooks'
import { useRouter } from 'next/router'

interface Props extends ErrorAwarePageProps {
  idolId: string
}

const IdolDetails: NextPage<Props> = (props) => {
  const idol = useAppSelector((state) => state.idol.idols[props.idolId])
  const user = useAppSelector((state) => state.user.currentUser)
  const idolChekis = useAppSelector(
    (state) => state.cheki.idolChekis[props.idolId]
  )
  const router = useRouter()
  const onDataTimeRangeChange = useCallback(
    (dateRange: ColneDateRange | null) => {
      router.push({
        query: {
          ...router.query,
          cheki_start: dateRange?.startISOString,
          cheki_end: dateRange?.endISOString,
        },
      })
    },
    [idolChekis?.dateTimeRangeEnd, idolChekis?.dateTimeRangeStart, router]
  )

  if (props.error) {
    return <Error statusCode={props.error.statusCode} />
  }

  return (
    <ContentLayout>
      <SpaceBetween size="xxl">
        {idol && (
          <IdolDetailsView
            idol={{
              name: idol.idolName,
              id: idol.idolId,
              status: idol.idolStatus,
              groups: idol.groups.map((group) => ({
                id: group.groupId,
                name: group.groupName,
              })),
              authorId: idol.user?.userId,
            }}
            currentUserId={user?.userId}
          />
        )}
        {user && idolChekis && (
          <IdolChekiStats
            isLoading={!idolChekis.isLoaded}
            chekis={idolChekis.chekis}
            dateRange={{
              startISOString: idolChekis.dateTimeRangeStart,
              endISOString: idolChekis.dateTimeRangeEnd,
            }}
            onDateRangeChange={onDataTimeRangeChange}
          />
        )}
      </SpaceBetween>
    </ContentLayout>
  )
}

IdolDetails.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async (ctx): Promise<Props> => {
      const idolId = ctx.query.id as string
      const chekisStartDateTime = asSingleStringParam(
        ctx.query.cheki_start,
        dayjs().subtract(1, 'months').toISOString()
      )
      const chekisEndDateTime = asSingleStringParam(
        ctx.query.cheki_end,
        dayjs().toISOString()
      )

      try {
        await getIdol(
          store.dispatch,
          { idolId },
          getRequestHeaderFromContext(ctx)
        )
        await updateIdolChekisWithDateRange(
          idolId,
          {
            startDate: dayjs(chekisStartDateTime),
            endDate: dayjs(chekisEndDateTime),
          },
          store.dispatch,
          getRequestHeaderFromContext(ctx)
        )
      } catch (e) {
        return {
          ...handleExceptionAndReturnErrorAwarePageProps(e, ctx),
          idolId,
        }
      }
      return { idolId }
    }
)

export default IdolDetails
