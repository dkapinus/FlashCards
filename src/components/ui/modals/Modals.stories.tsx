import { Input } from '@/components/ui/input'
import { Modals } from '@/components/ui/modals/Modals'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: Modals,
  tags: ['auto docs'],
  title: 'Components/ModalsForOptions',
} satisfies Meta<typeof Modals>

type Story = StoryObj<typeof meta>
export default meta
export const ModalWithInput: Story = {
  args: {
    buttonTitle: 'Button title',
    children: (
      <>
        <Input label={'Input'} value={'value'} />
        <Input label={'Input'} />
        <Input label={'Input'} />
      </>
    ),
    modalTitle: 'Modal title',
    showCloseButton: true,
  },
}

export const ModalWithoutTitle: Story = {
  args: {
    buttonTitle: 'Button title',
    children:
      'Radix Primitives is a low-level UI component library with a focus on accessibility, customization and developer experience. You can use these components either as the base layer of your design system, or adopt them incrementally.',
  },
}
export const ModalWithTitle: Story = {
  args: {
    buttonTitle: 'Button title',
    children:
      'Radix Primitives is a low-level UI component library with a focus on accessibility, customization and developer experience. You can use these components either as the base layer of your design system, or adopt them incrementally.',
    modalTitle: 'Modal title',
    showCloseButton: true,
  },
}
// @ts-ignore
