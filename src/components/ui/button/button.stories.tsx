import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from '@/components/ui/icon/Icon'

import { Button } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Primary2: Story = {
  args: {
    children: (
      <>
        <Icon height={'16'} iconId={'log-out'} viewBox={'0 0 16 16'} width={'16'} />
        Primary Button
      </>
    ),
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: ' Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const Secondary2: Story = {
  args: {
    children: (
      <>
        <Icon height={'16'} iconId={'log-out'} viewBox={'0 0 16 16'} width={'16'} />
        Secondary Button
      </>
    ),
    disabled: false,
    variant: 'secondary',
  },
}
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    disabled: false,
    variant: 'tertiary',
  },
}
export const Link: Story = {
  args: {
    as: 'a',
    children: 'Link_Button',
    disabled: false,
    href: 'https://www.google.com',
    variant: 'link',
  },
}
