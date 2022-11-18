import { ComponentMeta, ComponentStory } from '@storybook/react'
import { MonthlyChekiCounts } from 'components/top/MonthlyChekiCounts'

const componentMeta: ComponentMeta<typeof MonthlyChekiCounts> = {
  title: 'Top/MonthlyChekiCounts',
  component: MonthlyChekiCounts,
}

export default componentMeta

const Template: ComponentStory<typeof MonthlyChekiCounts> = (args) => (
  <MonthlyChekiCounts {...args} />
)

export const Empty = Template.bind({})

Empty.args = {
  chekiCounts: [],
}

export const Primary = Template.bind({})

Primary.args = {
  chekiCounts: [
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
  ],
}
