import { Container, Header } from '@cloudscape-design/components'
import { IdolStatus } from 'graphql/generated/client'

export function GroupIdolList({}: {
  idols: {
    idolCreatedAt: string
    idolId: string
    idolName: string
    idolStatus: IdolStatus
    idolUpdatedAt: string
    userId?: string | null
    user?: {
      userId: string
      userName: string
    } | null
    groups: Array<{
      groupId: string
      groupName: string
    } | null>
  }[]
}) {
  return <Container header={<Header variant="h2">アイドル</Header>}></Container>
}
