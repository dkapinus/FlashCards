import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './index'
const meta = {
  argTypes: {},
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Radio: Story = {
  args: {
    disabled: false,
    onChange: (e: string) => console.log(e),
    options: [
      { id: 1, title: 'Did not know', value: '1' },
      { id: 2, title: 'Forgot', value: '2' },
      { id: 3, title: 'A lot of though', value: '3' },
      { id: 4, title: 'Confused', value: '4' },
      { id: 5, title: 'Know the answer', value: '5' },
    ],
  },
}
