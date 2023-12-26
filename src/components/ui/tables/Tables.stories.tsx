import type { Meta, StoryObj } from '@storybook/react'

import { Tables } from './'

const meta = {
  argTypes: {},
  component: Tables,
  tags: ['autodocs'],
  title: 'Components/Tables',
} satisfies Meta<typeof Tables>

export default meta
type Story = StoryObj<typeof meta>

export const TablesStory: Story = {
  args: {
    checked: data => console.log(data),
    edit: () => console.log('edit'),
    learn: () => console.log('learn'),
    remove: () => console.log('remove'),
    text: 'Sasha',
  },
}
