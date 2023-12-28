import { ChangeEvent, useState } from 'react'

import { Input, InputProps } from '@/components/ui/input/Input'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultTextField: Story = {}

export const ErrorTextField: Story = {
  args: {
    errorMessage: 'Some error',
    type: 'text',
  },
}

export const DisabledTextField: Story = {
  args: {
    disabled: true,
    label: 'Input',
    placeholder: 'Disabled ',
    type: 'text',
    value: 'Disabled',
  },
}

export const SearchTextField: Story = {
  args: {
    label: 'Search',
    type: 'search',
    value: 'Search',
  },
}

const Component = (args: InputProps) => {
  const [value, setValue] = useState('')

  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const handlePressOnEnter = () => {
    setValue('')
  }

  const handleChangeValue = (value: string) => {
    setValue(value)
  }

  return (
    <Input
      {...args}
      onChange={onChangeValueHandler}
      onPressEnter={handlePressOnEnter}
      onValueChange={handleChangeValue}
      value={value}
    />
  )
}

export const DefaultControlled: Story = {
  render: () => <Component />,
}
export const SearchControlled: Story = {
  args: {
    label: 'Search input',
    type: 'search',
  },
  render: (args: InputProps) => <Component {...args} />,
}
export const PasswordControlled: Story = {
  args: {
    label: 'Password',
    type: 'password',
  },
  render: (args: InputProps) => <Component {...args} />,
}
