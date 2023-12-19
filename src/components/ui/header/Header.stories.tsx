import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './index'
const meta = {
  argTypes: {},
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderS: Story = {
  args: {
    isLoginIn: true,
    name: 'Users',
  },
}
