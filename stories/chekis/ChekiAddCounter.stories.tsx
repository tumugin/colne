import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ChekiAddCounter } from 'components/chekis/ChekiAddCounter'

const componentMeta: ComponentMeta<typeof ChekiAddCounter> = {
  title: 'Chekis/ChekiAddCounter',
  component: ChekiAddCounter,
}

export default componentMeta

const Template: ComponentStory<typeof ChekiAddCounter> = (args) => (
  <ChekiAddCounter {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  countValue: 1,
}
