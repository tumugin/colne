import { NextPage } from 'next'
import { ContentLayout } from '@cloudscape-design/components'
import { wrapper } from 'store'
import { getIdol } from 'store/idol/idolHooks'
import { getRequestHeaderFromContext } from 'utils/headers'

const IdolDetails: NextPage = () => {
  return <ContentLayout></ContentLayout>
}

IdolDetails.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (ctx) => {
    await getIdol(
      store.dispatch,
      { idolId: ctx.query.id as string },
      getRequestHeaderFromContext(ctx)
    )
  }
)

export default IdolDetails
