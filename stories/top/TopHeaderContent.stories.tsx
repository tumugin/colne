import { TopHeaderContent } from '../../components/top/TopHeaderContent'
import { ComponentMeta, ComponentStory } from '@storybook/react'

const componentMeta: ComponentMeta<typeof TopHeaderContent> = {
  title: 'Top/TopHeaderContent',
  component: TopHeaderContent,
}

export default componentMeta

const Template: ComponentStory<typeof TopHeaderContent> = (args) => (
  <TopHeaderContent {...args} />
)

export const Primary = Template.bind({})
