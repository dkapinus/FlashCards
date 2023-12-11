import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from '@/components/ui/typography/Typography.module.scss'

export type TypographyProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
  fullWidth?: boolean
  variant?:
    | 'Body1'
    | 'Body2'
    | 'Caption'
    | 'H1'
    | 'H2'
    | 'H3'
    | 'Large'
    | 'Link1'
    | 'Link2'
    | 'Overline'
    | 'Subtitle1'
    | 'Subtitle2'
}

export const Typography = <T extends ElementType = 'div'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { as: Component = 'div', className, fullWidth, variant = 'H1', ...rest } = props

  return (
    <Component
      className={`${s.div} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      {...rest}
    />
  )
}
