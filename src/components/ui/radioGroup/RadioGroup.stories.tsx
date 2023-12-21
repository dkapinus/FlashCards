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
    active: true,
    changeValue: e => console.log(e),
    disabled: false,
    title: ['Radio', 'Radio2', 'Radio3', 'Radio4', 'Radio5'],
  },
}
