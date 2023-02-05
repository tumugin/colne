import {
  ErrorAwarePageProps,
  handleExceptionAndReturnErrorAwarePageProps,
} from 'utils/error-aware-page-utils'
import { NextPage } from 'next'
import { wrapper } from 'store'
import { getIdol } from 'store/idol/idolHooks'
import { getRequestHeaderFromContext } from 'utils/headers'

interface Props extends ErrorAwarePageProps {
  idolId: string
}

const IdolEdit: NextPage<Props> = (props) => {
  return <></>
}

IdolEdit.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async (ctx): Promise<Props> => {
      const idolId = ctx.query.id as string
      try {
        await getIdol(
          store.dispatch,
          { idolId },
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

export default IdolEdit