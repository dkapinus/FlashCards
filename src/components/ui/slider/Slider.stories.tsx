import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from '@/components/ui/slider/Slider'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/RangeSlider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderStory: Story = {
  args: {
    max: 12,
    min: 0,
    propsValue: [2, 10],
    step: 2,
  },
}
