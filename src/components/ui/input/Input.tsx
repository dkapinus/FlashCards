import { ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { Icon } from '@/components/ui/icon/Icon'
import { Typography } from '@/components/ui/typography'

import s from './Input.module.scss'

export type InputProps<T extends ElementType = 'input'> = {
  as?: T
  className?: string
  fullWidth?: boolean
  variant?: 'input'
} & ComponentPropsWithoutRef<T>

export const Input = <T extends ElementType = 'input'>(
  props: InputProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof InputProps<T>>
) => {
  const {
    as: Component = 'input',
    className,
    cross,
    error,
    eye,
    handleBlur,
    label,
    magnifier,
    value,
    variant = 'input',
    ...rest
  } = props
  const [touched, setTouched] = useState(false)

  return (
    <div>
      <Typography variant={'body2'}>{label}</Typography>
      <div
        className={`${s.inputWrapper} ${error ? s.error : ''} ${touched ? s.focus : ''}`}
        onBlur={() => setTouched(false)}
        onClick={() => setTouched(true)}
        tabIndex={0}
      >
        {magnifier && (
          <Icon height={'20'} iconId={'magnifier'} viewBox={'0 0 20 20'} width={'20'} />
        )}
        <Component
          className={`${s.input} ${s[variant]} ${error ? s.errorText : ''} ${className}`}
          onBlur={() => setTouched(false)}
          onClick={() => setTouched(true)}
          {...rest}
        />
        {eye && <Icon height={'20'} iconId={'eye'} viewBox={'0 0 20 20'} width={'20'} />}
        {cross && (
          <span className={s.cross}>
            <Icon height={'16'} iconId={'cross'} viewBox={'0 0 16 16'} width={'16'} />
          </span>
        )}
      </div>
      {error && (
        <Typography className={s.errorText} variant={'caption'}>
          error!
        </Typography>
      )}
    </div>
  )
}
