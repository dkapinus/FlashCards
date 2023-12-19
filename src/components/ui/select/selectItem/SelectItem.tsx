import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadixSelect from '@radix-ui/react-select'
import cn from 'classnames'

import s from './SelectItem.module.scss'

type Props = {
  className?: string
  pagination?: boolean
} & ComponentPropsWithoutRef<typeof RadixSelect.Item>

export const SelectItem = forwardRef<ElementRef<typeof RadixSelect.Item>, Props>(
  ({ children, className, pagination, ...restProps }, ref) => {
    return (
      <RadixSelect.Item
        className={cn(s.item, { [s.paginationItem]: pagination }, className)}
        ref={ref}
        {...restProps}
      >
        <RadixSelect.ItemText>
          <Typography variant={pagination ? 'body1' : 'body2'}>{children}</Typography>
        </RadixSelect.ItemText>
      </RadixSelect.Item>
    )
  }
)
