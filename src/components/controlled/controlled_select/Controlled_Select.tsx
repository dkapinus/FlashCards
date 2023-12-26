import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Select } from '@/components/ui/select'
import { SelectProps } from '@radix-ui/react-select'

export type ControlledInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SelectProps, 'onChange' | 'value'>

export const Controlled_Select = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...props
}: ControlledInputProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return <Select label={'password'} onValueChange={onChange} {...props} options={value} />
}
