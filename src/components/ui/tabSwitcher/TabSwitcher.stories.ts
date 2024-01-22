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
    tabs: [{ title: 'My Pack', value: 'My Pack' }],
  },
}
export const TabSwitcherDisabledSecondTab: Story = {
  args: {
    tabs: [
      { title: 'My Pack', value: 'My Pack' },
      { disabled: true, title: 'Cards', value: 'Cards' },
    ],
  },
}
export const TabSwitcherMultipleTabs: Story = {
  args: {
    tabs: [
      { title: 'My Pack', value: 'My Pack' },
      { title: 'All Pack', value: 'All Pack' },
      { title: 'All ', value: 'All' },
      { title: 'Cards', value: 'Cards' },
    ],
  },
}
