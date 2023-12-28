import type { Meta, StoryObj } from '@storybook/react'

import { Check_email } from '@/components/auth/check_email/Check_email'

const meta = {
  component: Check_email,
  tags: ['autodocs'],
  title: 'Auth/Check_email',
} satisfies Meta<typeof Check_email>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'example@mail.com',
  },
}
