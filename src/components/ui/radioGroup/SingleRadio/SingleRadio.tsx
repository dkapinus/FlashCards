import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadixRadio from '@radix-ui/react-radio-group'
import cn from 'classnames'

import s from './SingleRadio.module.scss'

type Props = {
  label: string
} & Omit<ComponentPropsWithoutRef<typeof RadixRadio.Item>, 'asChild'>

export const SingleRadio = ({ className, disabled, label, ...rest }: Props) => {
  return (
    <Typography
      as={'label'}
      className={cn(s.labelWrapper, { [s.disabled]: disabled }, className)}
      variant={'body2'}
    >
      <RadixRadio.Item className={s.item} disabled={disabled} {...rest}>
        <RadixRadio.Indicator className={s.indicator} />
      </RadixRadio.Item>
      {label}
    </Typography>
  )
}
