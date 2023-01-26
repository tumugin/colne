import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ChekiAddCounter } from 'components/chekis/ChekiAddCounter'
import { useState } from 'react'

const componentMeta: ComponentMeta<typeof ChekiAddCounter> = {
  title: 'Chekis/ChekiAddCounter',
  component: ChekiAddCounter,
}

export default componentMeta

const Template: ComponentStory<typeof ChekiAddCounter> = (args) => {
  const [countValue, setCountValue] = useState(args.countValue)
  return (
    <ChekiAddCounter
      {...args}
      countValue={countValue}
      onChange={setCountValue}
    />
  )
}

export const Primary = Template.bind({})

Primary.args = {
  countValue: 1,
  minValue: 1,
  maxValue: 1000,
}
