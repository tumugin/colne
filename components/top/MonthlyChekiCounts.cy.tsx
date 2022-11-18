import { MonthlyChekiCounts } from 'components/top/MonthlyChekiCounts'

describe('<MonthlyChekiCounts>', () => {
  it('mounts with smartphone', () => {
    cy.viewport('iphone-xr')
    cy.mount(<MonthlyChekiCounts chekiCounts={chekiCounts} />)
    cy.matchImage()
  })

  it('mounts with pc', () => {
    cy.viewport('macbook-16')
    cy.mount(<MonthlyChekiCounts chekiCounts={chekiCounts} />)
    cy.matchImage()
  })
})

const chekiCounts = [
  {
    chekiCount: 1,
    idol: {
      idolId: '1',
      idolName: 'あいす',
    },
  },
  {
    chekiCount: 1,
    idol: {
      idolId: '1',
      idolName: 'こるね',
    },
  },
  {
    chekiCount: 100,
    idol: {
      idolId: '1',
      idolName: '藍井すず',
    },
  },
  {
    chekiCount: 100,
    idol: {
      idolId: '1',
      idolName: '橋本あみ',
    },
  },
  {
    chekiCount: 100,
    idol: {
      idolId: '1',
      idolName: '藤宮めい',
    },
  },
  {
    chekiCount: 100,
    idol: {
      idolId: '1',
      idolName: '朝比奈れい',
    },
  },
  {
    chekiCount: 100,
    idol: {
      idolId: '1',
      idolName: '永堀ゆめ',
    },
  },
  {
    chekiCount: 100,
    idol: {
      idolId: '1',
      idolName: '工藤のか',
    },
  },
  {
    chekiCount: 100,
    idol: {
      idolId: '1',
      idolName: '七瀬れあ',
    },
  },
]
