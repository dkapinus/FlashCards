import { ChangeEvent, ComponentPropsWithoutRef, KeyboardEvent, forwardRef, useState } from 'react'

import { Icon } from '@/components/ui/icon/Icon'
import { Typography } from '@/components/ui/typography'

import s from './Input.module.scss'

export type InputProps = {
  errorMessage?: string
  label?: string
  onPressEnter?: ComponentPropsWithoutRef<'input'>['onKeyDown']
  onValueChange?: (e: string) => void
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    disabled,
    errorMessage,
    label,
    onChange,
    onPressEnter,
    onValueChange,
    type,
    value,
    ...rest
  } = props

  const [changeValue, setChangeValue] = useState(value)

  const [types, setType] = useState(type)

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
    if (!showPassword) {
      setType('')
    } else {
      setType('password')
    }
  }
  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChangeValue(e.currentTarget.value)
    onChange?.(e)
    onValueChange?.(e.currentTarget.value)
  }

  const handlePressOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e)
    }
  }

  const handleClickClearField = () => {
    setChangeValue('')
  }

  return (
    <div>
      <Typography className={s.label} variant={'body2'}>
        {label}
      </Typography>
      <div className={`${s.inputWrapper} ${errorMessage ? s.error : ''} `} tabIndex={0}>
        {type === 'search' && (
          <div className={s.magnifier}>
            <Icon height={'20'} iconId={'magnifier'} viewBox={'0 0 20 20'} width={'20'} />
          </div>
        )}
        <input
          className={`${s.input}  ${errorMessage ? s.errorText : ''}`}
          onChange={onchangeHandler}
          onKeyDown={handlePressOnEnter}
          ref={ref}
          type={types}
          value={changeValue}
          {...rest}
        />

        {type === 'password' && (
          <div className={s.eye && disabled ? s.disabled : s.eye} onClick={handleClickShowPassword}>
            {showPassword ? (
              <Icon height={'24'} iconId={'open_eye'} viewBox={'0 0 24 24'} width={'24'} />
            ) : (
              <Icon height={'24'} iconId={'close_eye'} viewBox={'0 0 24 24'} width={'24'} />
            )}
          </div>
        )}

        {type !== 'password' && changeValue && (
          <span className={s.cross} onClick={handleClickClearField}>
            <Icon height={'24'} iconId={'cross'} viewBox={'0 0 24 24'} width={'24'} />
          </span>
        )}
      </div>
      {errorMessage && (
        <Typography className={s.errorText} variant={'caption'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
})
