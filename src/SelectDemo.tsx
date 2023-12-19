import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Option } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import cn from 'classnames'

import s from '@/components/ui/select/Select.module.scss'

export type SelectProps = {
  className?: string
  label?: string
  options: Option[]
  pagination?: boolean
  placeholder: ReactNode
} & ComponentPropsWithoutRef<typeof Select.Root>

export const SelectRegular = forwardRef<ElementRef<typeof Select.Root>, SelectProps>(
  ({ className, label, options, pagination, placeholder, ...restProps }, ref) => {
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
      <Select.Root>
        {label && (
          <Typography className={classes.label} variant={'body2'}>
            {label}
          </Typography>
        )}
        <Select.Trigger className={classes.trigger} ref={ref}>
          <Typography variant={'body1'}>
            <Select.Value placeholder={currentPlaceholder} />
          </Typography>
          <Select.Icon className={classes.arrow}>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={s.content} position={'popper'} sideOffset={-1}>
            <Select.Viewport>
              <Select.Group>
                {options.map(el => (
                  <SelectItem key={el.value} pagination={pagination} value={el.value}>
                    {el.title}
                  </SelectItem>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    )
  }
)

type Props = {
  className?: string
  pagination?: boolean
  value: string
} & ComponentPropsWithoutRef<typeof Select.Item>

export const SelectItem = forwardRef<ElementRef<typeof Select.Item>, Props>(
  ({ children, className, pagination, value, ...props }, ref) => {
    return (
      <Select.Item className={cn('SelectItem', className)} value={value} {...props} ref={ref}>
        <Select.ItemText>
          <Typography variant={'body1'}>{children}</Typography>
        </Select.ItemText>
        <Select.ItemIndicator className={'SelectItemIndicator'}>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    )
  }
)
