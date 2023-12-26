import type { Meta, StoryObj } from '@storybook/react'

import { Login_form } from '@/components/auth/login_form/Login_form'

const meta = {
  component: Login_form,
  tags: ['autodocs'],
  title: 'Auth/Login_form',
} satisfies Meta<typeof Login_form>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
