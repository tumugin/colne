import { NextPage } from 'next'
import { ContentLayout } from '@cloudscape-design/components'
import { LoginRequired } from 'components/login/LoginRequired'
import Router, { useRouter } from 'next/router'
import { wrapper } from 'store'

const Login: NextPage = () => {
  const router = useRouter()
  const { return_to } = router.query
  const returnTo = Array.isArray(return_to) ? return_to[0] : return_to

  return (
    <ContentLayout>
      <LoginRequired returnTo={returnTo} />
    </ContentLayout>
  )
}

Login.getInitialProps = wrapper.getInitialPageProps((store) => async (ctx) => {
  const currentUser = store.getState().user.currentUser
  if (!currentUser) {
    return
  }
  if (typeof window === 'undefined') {
    await ctx.res?.writeHead(302, { Location: '/' })
    await ctx.res?.end()
  } else {
    await Router.push('/')
  }
})

export default Login
