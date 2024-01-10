import { ComponentPropsWithoutRef, ElementType } from 'react'

import { Typography } from '@/components/ui/typography'
import * as Radio from '@radix-ui/react-radio-group'
import * as cn from 'classnames'

import r from './RadioGroup.module.scss'

export type RadioGroupProps<T extends ElementType = 'input'> = {
  as?: T
  className?: string
  disabled?: boolean
  onChange: (e: string) => void
  options: { id: number; title: string; value: string }[]
} & ComponentPropsWithoutRef<T>

export const RadioGroup = <T extends ElementType = 'input'>(
  props: RadioGroupProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof RadioGroupProps<T>>
) => {
  const { as: Component = 'input', className, disabled, onChange, options, ...rest } = props

  const onHandlerChange = (e: string) => onChange(e)

  return (
    <Radio.Root
      {...rest}
      aria-label={'View density'}
      className={cn(r.RadioGroupRoot, className)}
      defaultValue={'default'}
      onValueChange={onHandlerChange}
    >
      {options.map(i => {
        return (
          <div className={r.RadioGroupWrapper} key={i.id}>
            <Radio.Item className={r.RadioGroupItem} id={`r${i.id}`} value={i.value}>
              <Radio.Indicator className={r.RadioGroupIndicator} />
            </Radio.Item>
            <label className={r.Label} htmlFor={`r${i.id}`}>
              <Typography variant={'body2'}>{i.title}</Typography>
            </label>
          </div>
        )
      })}
    </Radio.Root>
  )
}
