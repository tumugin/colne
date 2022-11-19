import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LoginRequired } from 'components/login/LoginRequired'

const componentMeta: ComponentMeta<typeof LoginRequired> = {
  title: 'Login/LoginRequired',
  component: LoginRequired,
}

export default componentMeta

const Template: ComponentStory<typeof LoginRequired> = (args) => (
  <LoginRequired {...args} />
)

export const Primary = Template.bind({})
