import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from '@/components/ui/tabSwitcher/TabSwitcher'

const meta = {
  argTypes: {},
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/TabSwitcher',
} satisfies Meta<typeof TabSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const TabSwitcherActive: Story = {
  args: {
    disabled: false,
    name: 'Switcher',
    value: 'ActiveSwitcher',
  },
}
export const TabSwitcherDisabled: Story = {
  args: {
    name: 'Switcher',
    value: 'DisabledSwitcher',
  },
}
