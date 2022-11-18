import { Box, Container, Header } from '@cloudscape-design/components'
import styled from 'styled-components'
import * as awsui from '@cloudscape-design/design-tokens'

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${awsui.spaceScaledXl};
  place-items: start center;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const IdolChekiCount = styled(Container)`
  width: 100%;
`

export function MonthlyChekiCounts({
  chekiCounts,
}: {
  chekiCounts: {
    chekiCount: number
    idol: {
      idolId: string
      idolName: string
    } | null
  }[]
}) {
  return (
    <Container header={<Header variant="h2">今月のチェキ撮影枚数</Header>}>
      {chekiCounts.length === 0 ? (
        <Box fontSize="heading-s" textAlign="center">
          今月撮影されたチェキはありません
        </Box>
      ) : (
        <ContentGrid>
          {chekiCounts.map((chekiCount, id) => (
            <IdolChekiCount
              key={id}
              header={
                <Header variant="h3">
                  {chekiCount.idol?.idolName ?? '名前不明のアイドル'}
                </Header>
              }
            >
              <Box fontSize="heading-m" textAlign="center">
                {chekiCount.chekiCount}枚
              </Box>
            </IdolChekiCount>
          ))}
        </ContentGrid>
      )}
    </Container>
  )
}
