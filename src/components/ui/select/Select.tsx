import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { SelectItem } from '@/components/ui/select/selectItem'
import { Typography } from '@/components/ui/typography'
import { ChevronUpIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import cn from 'classnames'

import s from './Select.module.scss'

export interface Option {
  title: ReactNode
  value: string
}

export type SelectProps = {
  className?: string
  label?: string
  options: Option[]
  pagination?: boolean
  placeholder?: ReactNode
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>

export const Select = forwardRef<ElementRef<typeof RadixSelect.Root>, SelectProps>(
  (
    { className, label, options, pagination, placeholder = 'Select value...', ...restProps },
    ref
  ) => {
    const classes = {
      arrow: cn(s.triggerIcon, { [s.disabled]: restProps.disabled }),
      label: cn(s.label, { [s.disabled]: restProps.disabled }),
      trigger: cn(
        s.trigger,
        {
          [s.paginationTrigger]: pagination,
        },
        className
      ),
    }

    const currentPlaceholder = pagination ? options[0].title : placeholder

    return (
      <RadixSelect.Root {...restProps}>
        {label && (
          <Typography className={classes.label} variant={'body2'}>
            {label}
          </Typography>
        )}
        <RadixSelect.Trigger className={classes.trigger} ref={ref}>
          <Typography variant={'subtitle1'}>
            <RadixSelect.Value placeholder={currentPlaceholder} />
          </Typography>
          <RadixSelect.Icon>
            <ChevronUpIcon className={classes.arrow} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={s.content} position={'popper'} sideOffset={-1}>
            <RadixSelect.Viewport>
              {options.map(el => (
                <SelectItem key={el.value} pagination={pagination} value={el.value}>
                  {el.title}
                </SelectItem>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    )
  }
)
