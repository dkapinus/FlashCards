import type { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from '@/components/auth/edit_profile/Edit_Profile'

const meta = {
  component: EditProfile,
  tags: ['autodocs'],
  title: 'Auth/EditProfile',
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'Mail.com',
    userName: 'Name',
  },
}
