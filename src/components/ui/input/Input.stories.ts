import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Input } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'onChange' },
      options: ['input'],
    },
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputClasuc: Story = {
  args: {
    disabled: false,
    error: false,
    label: 'Input',
    placeholder: 'Input',
    variant: 'input',
  },
}
export const InputWithIconsRight: Story = {
  args: {
    disabled: false,
    error: true,
    eye: true,
    label: 'Input',
    placeholder: 'Input',
    svgSrc: true,
    variant: 'input',
  },
}
export const InputSearch: Story = {
  args: {
    cross: true,
    disabled: false,
    magnifier: true,
    placeholder: 'Input search',
    value: 'Input search',
    variant: 'input',
  },
}
