import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Icon } from '@/components/ui/icon/Icon'
import { Typography } from '@/components/ui/typography'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import cn from 'classnames'

import s from './Checkbox.module.scss'

export type CheckboxProps = {
  label?: string
  onBlur?: () => void
} & Omit<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, 'asChild'>

export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  ({ className, disabled, label, onBlur, ...restProps }, ref) => {
    return (
      <Typography
        as={'label'}
        className={cn(s.label, { [s.disabled]: disabled }, className)}
        variant={'body2'}
      >
        <RadixCheckbox.Root
          className={s.root}
          disabled={disabled}
          onBlur={onBlur}
          ref={ref}
          {...restProps}
        >
          <RadixCheckbox.Indicator className={s.indicator}>
            <Icon height={'18'} iconId={'check'} viewBox={'0 0 18 18'} width={'18px'} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label}
      </Typography>
    )
  }
)
