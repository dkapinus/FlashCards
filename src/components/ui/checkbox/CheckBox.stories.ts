import type { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'checkbox' },
      options: ['Selected', 'Unselected'],
    },
  },
  component: CheckBox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof CheckBox>

export default meta

type Story = StoryObj<typeof meta>

export const CheckboxSelected: Story = {
  args: {
    checked: true,
    disabled: false,
    id: '1',
    label: 'Check-box',
  },
}
export const CheckboxUnSelected: Story = {
  args: {
    checked: false,
    disabled: false,
    id: '1',
    label: 'Check-box',
  },
}
export const CheckboxWithoutLabel: Story = {
  args: {
    checked: false,
    disabled: false,
    id: '1',
  },
}
