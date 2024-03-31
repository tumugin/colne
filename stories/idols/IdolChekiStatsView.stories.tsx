import { Meta, StoryObj } from '@storybook/react'
import { IdolChekiStatsView } from 'components/idols/idolChekiStatsView'

const componentMeta: Meta<typeof IdolChekiStatsView> = {
  title: 'Idols/IdolChekiStatsView',
  component: IdolChekiStatsView,
}

export default componentMeta

type Story = StoryObj<typeof IdolChekiStatsView>

export const Default: Story = {
  args: {
    isLoading: false,
    stats: [
      { id: '1', name: 'チェキ撮影枚数', value: 100, unitName: '枚' },
      {
        id: '2',
        name: '週あたりのチェキ撮影枚数',
        value: 10,
        unitName: '枚/週',
      },
      {
        id: '3',
        name: '一番使用されたレギュレーション',
        value: '通常レギュレーション(2000円会計ごとに1枚)',
        smallText: true,
      },
      {
        id: '4',
        name: '使用金額',
        value: 10000,
        unitName: '円',
        defaultHidden: true,
      },
    ],
  },
}
