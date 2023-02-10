import { NextPage } from 'next'
import { wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'

const GroupList: NextPage = () => {
  // TODO
  return <></>
}

GroupList.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (ctx) => {
    const currentUser = store.getState().user.currentUser
    if (!currentUser) {
      await redirectIfNotLoggedIn(ctx)
    }
  }
)

export default GroupList
