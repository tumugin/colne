import type { NextPage } from 'next'
import React from 'react'
import {
  Button,
  Container,
  ContentLayout,
  Header,
} from '@cloudscape-design/components'

const Home: NextPage = () => {
  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          actions={<Button variant="primary">ログイン</Button>}
        >
          チェキを管理するやつ(仮)
        </Header>
      }
    >
      <Container>あああああ</Container>
    </ContentLayout>
  )
}

export default Home
