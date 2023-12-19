import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'

const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
    },

    label: {
      control: 'text',
    },
    onValueChange: {
      action: 'Select value changed!',
    },
    placeholder: {
      control: 'text',
    },
  },
  component: Select,
  tags: ['autodocs'],
  title: 'components/Select', //change
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const options = [
  { title: 'Select_box', value: 'title1' },
  { title: 'title2', value: 'title2' },
  { title: 'title3', value: 'title3' },
  { title: 'title4', value: 'title4' },
]

export const WithLabel: Story = {
  args: {
    disabled: false,
    label: 'Some text for label',
    options,
    placeholder: 'Placeholder text',
  },
}

export const Default: Story = {
  args: {
    disabled: false,
    options,
  },
}

export const Pagination: Story = {
  args: {
    options: [
      { title: '10', value: '10' },
      { title: '20', value: '20' },
      { title: '50', value: '50' },
      { title: '100', value: '100' },
    ],
    pagination: true,
    placeholder: '100',
  },
}
