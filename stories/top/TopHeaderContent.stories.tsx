import { TopHeaderContent } from 'components/top/TopHeaderContent'
import { Meta, StoryObj } from '@storybook/react'

const componentMeta: Meta<typeof TopHeaderContent> = {
  title: 'Top/TopHeaderContent',
  component: TopHeaderContent,
}

export default componentMeta

type Story = StoryObj<typeof TopHeaderContent>

export const Default: Story = {}
