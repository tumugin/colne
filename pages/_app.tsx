import '../styles/globals.css'
import '@cloudscape-design/global-styles/index.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { wrapper } from 'store'
import { Provider } from 'react-redux'
import { updateCurrentUserState } from 'store/user/userHooks'
import { getRequestHeaderFromAppContext } from 'utils/headers'
import App from 'next/app'
import { updateCSRFToken } from 'store/common/commonHooks'
import { ColneAppWithLayout } from 'components/common/ColneAppWithLayout'
import { GlobalThemeHandler } from 'components/common/GlobalThemeHandler'
import { dummyPromise } from 'utils/promise'

function ColneApp(appProps: AppProps) {
  const { store, props } = wrapper.useWrappedStore(appProps)
  return (
    <Provider store={store}>
      <GlobalThemeHandler />
      <ColneAppWithLayout {...props} />
    </Provider>
  )
}

ColneApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (ctx) => {
    const currentState = store.getState()
    await Promise.all([
      currentState.common.csrfToken
        ? dummyPromise()
        : store.dispatch((d) =>
            updateCSRFToken(d, getRequestHeaderFromAppContext(ctx))
          ),
      currentState.user.currentUser
        ? dummyPromise()
        : store.dispatch((d) =>
            updateCurrentUserState(d, getRequestHeaderFromAppContext(ctx))
          ),
    ])

    return {
      pageProps: {
        ...(await App.getInitialProps(ctx)).pageProps,
      },
    }
  }
)

export default ColneApp
