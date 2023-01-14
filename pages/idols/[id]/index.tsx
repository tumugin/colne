import { NextPage } from 'next'
import { ContentLayout } from '@cloudscape-design/components'
import { getRequestHeaderFromContext } from 'utils/headers'
import { wrapper } from 'store'
import { getIdol } from 'store/idol/idolHooks'
import {
  ErrorAwarePageProps,
  handleExceptionAndReturnErrorAwarePageProps,
} from 'utils/error-aware-page-utils'
import Error from 'next/error'

interface Props extends ErrorAwarePageProps {}

const IdolDetails: NextPage<Props> = (props) => {
  if (props.error) {
    return <Error statusCode={props.error.statusCode} />
  }

  return <ContentLayout></ContentLayout>
}

IdolDetails.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async (ctx): Promise<Props> => {
      if (store.getState().idol.idols[ctx.query.id as string]) {
        return {}
      }
      try {
        await getIdol(
          store.dispatch,
          { idolId: ctx.query.id as string },
          getRequestHeaderFromContext(ctx)
        )
      } catch (e) {
        return handleExceptionAndReturnErrorAwarePageProps(e, ctx)
      }
      return {}
    }
)

export default IdolDetails
