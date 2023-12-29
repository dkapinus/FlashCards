import type { Meta, StoryObj } from '@storybook/react'

import { Create_New_Password } from '@/components/auth/create_new_password/Create_New_Password'

const meta = {
  component: Create_New_Password,
  tags: ['autodocs'],
  title: 'Auth/Create_New_Password',
} satisfies Meta<typeof Create_New_Password>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: () => {},
  },
}
