import { Meta, StoryObj } from '@storybook/react'
import { LoginRequired } from 'components/login/LoginRequired'

const componentMeta: Meta<typeof LoginRequired> = {
  title: 'Login/LoginRequired',
  component: LoginRequired,
}

export default componentMeta

type Story = StoryObj<typeof LoginRequired>

export const Default: Story = {}
