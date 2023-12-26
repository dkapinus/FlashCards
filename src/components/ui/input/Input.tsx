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
  const [touched, setTouched] = useState(false)
  const [changeValue, setChangeValue] = useState(value)

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
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
      <Typography variant={'body2'}>{label}</Typography>
      <div
        className={`${s.inputWrapper} ${errorMessage ? s.error : ''} ${touched ? s.focus : ''}`}
        onBlur={() => setTouched(false)}
        onClick={() => setTouched(true)}
        tabIndex={0}
      >
        {type === 'search' && (
          <Icon height={'20'} iconId={'magnifier'} viewBox={'0 0 20 20'} width={'20'} />
        )}
        <input
          className={`${s.input}  ${errorMessage ? s.errorText : ''}`}
          onBlur={() => setTouched(false)}
          onChange={onchangeHandler}
          onClick={() => setTouched(true)}
          onKeyDown={handlePressOnEnter}
          ref={ref}
          value={changeValue}
          {...rest}
        />

        {type === 'password' && (
          <div onClick={handleClickShowPassword}>
            {showPassword ? (
              <Icon height={'24'} iconId={'close_eye'} viewBox={'0 0 24 24'} width={'24'} />
            ) : (
              <Icon height={'24'} iconId={'open_eye'} viewBox={'0 0 24 24'} width={'24'} />
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
