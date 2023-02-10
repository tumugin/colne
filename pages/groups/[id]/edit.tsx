import { ErrorAwarePageProps } from 'utils/error-aware-page-utils'
import { NextPage } from 'next'
import { wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'

interface Props extends ErrorAwarePageProps {
  idolId: string
}

const GroupEdit: NextPage<Props> = (props) => {
  // TODO
  return <></>
}

GroupEdit.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async (ctx): Promise<Props> => {
      const currentUser = store.getState().user.currentUser
      if (!currentUser) {
        await redirectIfNotLoggedIn(ctx)
      }

      const idolId = ctx.query.id as string

      return {
        idolId,
      }
    }
)

export default GroupEdit
