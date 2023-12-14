import { ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { Typography } from '@/components/ui/typography'
import crossSrc from '@/images/cross.svg'
import eyeSrc from '@/images/eye.svg'
import magnifierSrc from '@/images/magnifier.svg'

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
        {magnifier && <img alt={'SVG Icon'} className={s.magnifier} src={magnifierSrc} />}
        <Component
          className={`${s.input} ${s[variant]} ${error ? s.errorText : ''} ${className}`}
          onBlur={() => setTouched(false)}
          onClick={() => setTouched(true)}
          {...rest}
        />
        {eye && <img alt={'SVG Icon'} className={s.eye} src={eyeSrc} />}
        {cross && <img alt={'SVG Icon'} className={s.cross} src={crossSrc} />}
      </div>
      {error && (
        <Typography className={s.errorText} variant={'caption'}>
          error!
        </Typography>
      )}
    </div>
  )
}
