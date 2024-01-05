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
    tabs: [{ title: 'My Cards', value: 'My Cards' }],
  },
}
export const TabSwitcherDisabledSecondTab: Story = {
  args: {
    tabs: [
      { title: 'My Cards', value: 'My Cards' },
      { disabled: true, title: 'Cards', value: 'Cards' },
    ],
  },
}
export const TabSwitcherMultipleTabs: Story = {
  args: {
    tabs: [
      { title: 'My Cards', value: 'My Cards' },
      { title: 'All Cards', value: 'All Cards' },
      { title: 'All ', value: 'All' },
      { title: 'Cards', value: 'Cards' },
    ],
  },
}
