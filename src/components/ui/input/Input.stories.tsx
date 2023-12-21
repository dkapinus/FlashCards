import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

const meta = {
  argTypes: {},
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputWithoutIcons: Story = {
  args: {
    disabled: false,
    error: false,
    label: 'Input',
    placeholder: 'Input',
  },
}
export const InputWithIconsRight: Story = {
  args: {
    disabled: false,
    error: false,
    eye: true,
    label: 'Input',
    placeholder: 'Input',
  },
}
export const InputSearch: Story = {
  args: {
    cross: true,
    disabled: false,
    error: false,
    magnifier: true,
    placeholder: 'Input search',
  },
}
