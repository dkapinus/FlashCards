import type { Meta, StoryObj } from '@storybook/react'

import { Table } from '@/components/ui/table/Table'

const meta = {
  argTypes: {},
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const TableStory: Story = {
  args: {
    checked: data => console.log(data),
    edit: () => console.log('edit'),
    learn: () => console.log('learn'),
    remove: () => console.log('remove'),
    text: 'Sasha',
  },
}
