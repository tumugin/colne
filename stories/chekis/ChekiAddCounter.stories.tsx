import { Meta, StoryObj } from '@storybook/react'
import { ChekiAddCounter } from 'components/chekis/ChekiAddCounter'
import { useState } from 'react'

const componentMeta: Meta<typeof ChekiAddCounter> = {
  title: 'Chekis/ChekiAddCounter',
  component: ChekiAddCounter,
}

export default componentMeta

type Story = StoryObj<typeof ChekiAddCounter>

export const Default: Story = {
  args: {
    countValue: 1,
    minValue: 1,
    maxValue: 1000,
  },
  render: (args) => {
    const [countValue, setCountValue] = useState(args.countValue)
    return (
      <ChekiAddCounter
        {...args}
        countValue={countValue}
        onChange={setCountValue}
      />
    )
  },
}
