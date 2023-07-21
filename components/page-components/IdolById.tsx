'use client'

import React, { useCallback } from 'react'
import { ColneDateRange } from 'components/parts/ColneDataRangePicker'
import { ContentLayout, SpaceBetween } from '@cloudscape-design/components'
import { IdolDetailsView } from 'components/idols/IdolDetailsView'
import { IdolChekiStats } from 'components/idols/idolChekiStats'
import { Idol } from 'api-client/idol'
import { nonNullable } from 'utils/array'
import { IdolCheki } from 'api-client/cheki'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CurrentUser } from 'api-client/user'

export function IdolById({
  idol,
  idolChekis,
  range,
  currentUser,
}: {
  idol: Idol
  idolChekis: IdolCheki[]
  range: {
    startISOString: string
    endISOString: string
  }
  currentUser: CurrentUser | null
}) {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const onDataTimeRangeChange = useCallback(
    (dateRange: ColneDateRange | null) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      dateRange?.startISOString &&
        current.set('chekiStart', dateRange.startISOString)
      dateRange?.endISOString && current.set('chekiEnd', dateRange.endISOString)
      router.push(`${pathName}?${current.toString()}`)
    },
    [pathName, router, searchParams],
  )

  return (
    <ContentLayout>
      <SpaceBetween size="xxl">
        <IdolDetailsView
          idol={{
            name: idol.idolName,
            id: idol.idolId,
            status: idol.idolStatus,
            groups: idol.groups.filter(nonNullable).map((group) => ({
              id: group.groupId,
              name: group.groupName,
            })),
            authorId: idol.user?.userId,
          }}
          currentUserId={currentUser?.userId}
        />
        {currentUser && idolChekis && (
          <IdolChekiStats
            isLoading={false}
            chekis={idolChekis}
            dateRange={{
              startISOString: range.startISOString,
              endISOString: range.endISOString,
            }}
            onDateRangeChange={onDataTimeRangeChange}
          />
        )}
      </SpaceBetween>
    </ContentLayout>
  )
}
