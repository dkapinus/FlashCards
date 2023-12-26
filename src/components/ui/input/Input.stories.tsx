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
    errorMessage: '',
    label: 'Input',
    placeholder: 'Input',
  },
}
export const InputWithIconsRight: Story = {
  args: {
    disabled: false,
    errorMessage: '',
    label: 'Input',
    placeholder: 'Input',
    type: 'password',
  },
}
export const InputSearch: Story = {
  args: {
    disabled: false,
    errorMessage: '',
    placeholder: 'Input search',
    type: 'search',
  },
}
