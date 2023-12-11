import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './secondary_button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  fullWidth?: boolean
  variant?: 'active' | 'default' | 'disabled' | 'focus' | 'hover' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const SecondaryButton = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const { as: Component = 'button', className, fullWidth, variant = 'secondary', ...rest } = props

  return (
    <Component
      className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      {...rest}
    />
  )
}
