import type { Meta, StoryObj } from '@storybook/react'

import { User } from '@/components/ui/header/user/User'

import { DropDownMenu } from './index'

const meta = {
  argTypes: {
    variant: {},
  },
  component: DropDownMenu,
  tags: ['autodocs'],
  title: 'Components/DropDownMenu',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDown: Story = {
  args: {
    child: <User name={'User'} />,
    mail: 'adafeafw',
    userName: 'User',
  },
}
