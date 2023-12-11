import type { Meta, StoryObj } from '@storybook/react'

import { SecondaryButton } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['active', 'default', 'disabled', 'focus', 'hover', 'secondary'],
    },
  },
  component: SecondaryButton,
  tags: ['autodocs'],
  title: 'Components/SecondaryButton',
} satisfies Meta<typeof SecondaryButton>

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'active',
  },
}
export const Hover: Story = {
  args: {
    children: 'Button Secondary',
    disabled: false,
    variant: 'hover',
  },
}

export const Disabled: Story = {
  args: {
    as: 'button',
    children: 'Button Secondary',
    className: 'disabled', // Добавляем класс disabled
    disabled: true,
    variant: 'disabled',
  },
}
export const Default: Story = {
  args: {
    as: 'button',
    children: 'Button Secondary',
    className: 'disabled', // Добавляем класс disabled
    disabled: true,
    variant: 'default',
  },
}
export const Focus: Story = {
  args: {
    as: 'button',
    children: 'Button Secondary',
    className: 'disabled', // Добавляем класс disabled
    disabled: true,
    variant: 'focus',
  },
}
