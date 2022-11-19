import {
  Alert,
  Box,
  Button,
  Container,
  Header,
} from '@cloudscape-design/components'
import { loginPath, loginPathWithReturnToURL } from 'utils/urls'

export function LoginRequired({ returnTo }: { returnTo?: string }) {
  return (
    <Container header={<Header variant="h2">ログイン</Header>}>
      <Alert header="ログインが必要です">
        この先のページを閲覧するにはログインが必要です。
      </Alert>
      <Box padding="xxxl" textAlign="center">
        <Button
          ariaLabel="ログインページへ進む"
          href={returnTo ? loginPathWithReturnToURL(returnTo) : loginPath}
          iconAlign="left"
          iconName="key"
          variant="primary"
        >
          ログインページへ進む
        </Button>
      </Box>
    </Container>
  )
}
