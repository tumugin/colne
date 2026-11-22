import { Meta, StoryObj } from '@storybook/nextjs'
import { MonthlyChekiCounts } from 'components/top/MonthlyChekiCounts'

const componentMeta: Meta<typeof MonthlyChekiCounts> = {
  title: 'Top/MonthlyChekiCounts',
  component: MonthlyChekiCounts,
}

export default componentMeta

type Story = StoryObj<typeof MonthlyChekiCounts>

export const Empty: Story = {
  args: {
    chekiCounts: [],
    groupedChekiCounts: [],
  },
}

const groupA = { groupId: '1', groupName: 'グループ A' }
const groupB = { groupId: '2', groupName: 'グループ B' }

const chekiCounts = [
  {
    chekiCount: 1,
    totalPrice: 100,
    idol: {
      idolId: '1',
      idolName: 'あいす',
      groups: [groupA, groupB],
    },
  },
  {
    chekiCount: 1,
    totalPrice: 100,
    idol: {
      idolId: '2',
      idolName: 'こるね',
      groups: [],
    },
  },
  {
    chekiCount: 100,
    totalPrice: 100,
    idol: {
      idolId: '3',
      idolName: '藍井すず',
      groups: [groupA],
    },
  },
  {
    chekiCount: 100,
    totalPrice: 100,
    idol: {
      idolId: '4',
      idolName: '橋本あみ',
      groups: [groupA],
    },
  },
  {
    chekiCount: 100,
    totalPrice: 100,
    idol: {
      idolId: '5',
      idolName: '藤宮めい',
      groups: [groupA],
    },
  },
  {
    chekiCount: 100,
    totalPrice: 100,
    idol: {
      idolId: '6',
      idolName: '朝比奈れい',
      groups: [groupB],
    },
  },
  {
    chekiCount: 100,
    totalPrice: 100,
    idol: {
      idolId: '7',
      idolName: '永堀ゆめ',
      groups: [groupB],
    },
  },
  {
    chekiCount: 100,
    totalPrice: 100,
    idol: {
      idolId: '8',
      idolName: '工藤のか',
      groups: [groupB],
    },
  },
  {
    chekiCount: 100,
    totalPrice: 100,
    idol: {
      idolId: '9',
      idolName: '七瀬れあ',
      groups: [groupB],
    },
  },
]

export const Default: Story = {
  args: {
    chekiCounts,
    groupedChekiCounts: chekiCounts.map(({ chekiCount, idol }) => ({
      chekiCount,
      idol,
      idolId: idol.idolId,
      groupId: null,
      group: null,
    })),
  },
}
