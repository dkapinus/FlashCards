import type { Meta, StoryObj } from '@storybook/react'

import { Forgot_password } from '@/components/auth/forgot_password/Forgot_Password'

const meta = {
  component: Forgot_password,
  tags: ['autodocs'],
  title: 'Auth/Forgot_password',
} satisfies Meta<typeof Forgot_password>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Card content',
  },
}
