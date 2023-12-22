import type { Meta, StoryObj } from '@storybook/react'

import { User } from '@/components/ui/header/user/User'

import { DropDownMenuOptions } from './index'

const meta = {
  argTypes: {
    variant: {},
  },
  component: DropDownMenuOptions,
  tags: ['autodocs'],
  title: 'Components/DropDownMenu',
} satisfies Meta<typeof DropDownMenuOptions>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownOptions: Story = {
  args: {
    child: <User name={'User'} />,
    edit: () => console.log('edit'),
    learn: () => console.log('learn'),
    mail: 'adafeafw',
    remove: () => console.log('remove'),
    userName: 'User',
  },
}
