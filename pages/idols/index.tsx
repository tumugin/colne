import { NextPage } from 'next'
import React, { useCallback } from 'react'
import { ContentLayout } from '@cloudscape-design/components'
import { useAppSelector, wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
import { IdolListView } from 'components/idols/IdolListView'
import { useRouter } from 'next/router'
import { getUserCreatedIdols } from 'store/idol/idolHooks'
import { getRequestHeaderFromContext } from 'utils/headers'
import { asSingleNumberParam } from 'utils/query-params'

const IdolList: NextPage = () => {
  const router = useRouter()
  const userCreatedIdolsStore = useAppSelector(
    (state) => state.idol.userCreatedIdols
  )
  const onPageChange = useCallback(
    async (newPageNumber: number) => {
      await router.push({
        pathname: router.pathname,
        query: { page: newPageNumber },
      })
    },
    [router]
  )

  return (
    <ContentLayout>
      <IdolListView
        idols={userCreatedIdolsStore.idols.map((idol) => ({
          name: idol.idolName,
          id: idol.idolId,
          status: idol.idolStatus,
          groups: idol.groups.map((group) => ({
            id: group.groupId,
            name: group.groupName,
          })),
        }))}
        isLoading={!userCreatedIdolsStore.isLoaded}
        totalPages={userCreatedIdolsStore.pageCount}
        currentPage={userCreatedIdolsStore.currentPage}
        onPageChange={onPageChange}
      />
    </ContentLayout>
  )
}

IdolList.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (ctx) => {
    const currentUser = store.getState().user.currentUser
    if (!currentUser) {
      await redirectIfNotLoggedIn(ctx)
    }
    await store.dispatch((dispatch) =>
      getUserCreatedIdols(
        dispatch,
        { page: ctx.query.page ? asSingleNumberParam(ctx.query.page) : 1 },
        getRequestHeaderFromContext(ctx)
      )
    )
  }
)

export default IdolList
