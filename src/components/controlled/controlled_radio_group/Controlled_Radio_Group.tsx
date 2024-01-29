import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui/radioGroup/RadioGroup'

export type ControlledRadioGroupProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<RadioGroupProps, 'id' | 'onChange' | 'value'>

export const Controlled_Radio_Group = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  options,
  rules,
  shouldUnregister,
  ...radioGroupProps
}: ControlledRadioGroupProps<T>) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return <RadioGroup {...radioGroupProps} {...field} options={options} />
}
