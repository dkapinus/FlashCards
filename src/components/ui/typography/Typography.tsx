import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from '@/components/ui/typography/Typography.module.scss'

export type TypographyProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
}

export const Typography = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { as: Component = 'p', className, variant = 'body', ...rest } = props

  return <Component className={`${s.div} ${s[variant]}  ${className}`} {...rest} />
}
