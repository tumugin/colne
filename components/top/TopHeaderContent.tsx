import { Box, Container, Header } from '@cloudscape-design/components'
import React from 'react'
import { Graph } from './Graph'
import styled from 'styled-components'
import * as awsui from '@cloudscape-design/design-tokens'

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${awsui.spaceScaledXxxl};
  place-items: start center;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const ContentBox = styled(Box)`
  width: 100%;
  max-width: 400px;
`

export function TopHeaderContent(_: {}) {
  return (
    <Container
      header={
        <Header variant="h2">チェキを管理するやつ(仮)で出来ること</Header>
      }
    >
      <ContentGrid>
        <ContentBox>
          <Box variant="h4">統計機能で毎月のリザルトを簡単に確認</Box>
          <Graph />
        </ContentBox>
        <ContentBox>
          <Box variant="h4">毎月の使用金額を簡単に把握</Box>
          <Graph />
        </ContentBox>
        <ContentBox>
          <Box variant="h4">チェキの撮影記録をグループ・アイドルごとに管理</Box>
          <Graph />
        </ContentBox>
        <ContentBox>
          <Box variant="h4">チェキの撮影記録を簡単に登録</Box>
          <Graph />
        </ContentBox>
      </ContentGrid>
    </Container>
  )
}
