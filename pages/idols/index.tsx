import { NextPage } from 'next'
import React from 'react'
import { ContentLayout } from '@cloudscape-design/components'
import { wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
import { IdolListView } from 'components/idols/IdolListView'

const IdolList: NextPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <ContentLayout>
      <IdolListView
        idols={[]}
        isLoading={false}
        totalPages={1}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
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
  }
)

export default IdolList
