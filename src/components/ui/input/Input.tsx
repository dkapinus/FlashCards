import { ChangeEvent, ComponentPropsWithoutRef, KeyboardEvent, forwardRef, useState } from 'react'

import { Icon } from '@/components/ui/icon/Icon'
import cn from 'classnames'

import s from './Input.module.scss'

import { Typography } from '../typography'

export type InputProps = {
  errorMessage?: string
  inputClassName?: string
  label?: string
  onPressEnter?: ComponentPropsWithoutRef<'input'>['onKeyDown']
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    children,
    className,
    disabled,
    errorMessage,
    inputClassName,
    label,
    name,
    onChange,
    onPressEnter,
    onValueChange,
    type,
    value,
    ...restProps
  } = props
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  const inputType = type === 'password' && showPassword ? 'text' : type
  const isShowCrossIcon = type === 'search' && value
  const cnStyle = {
    input: cn(
      s.input,
      {
        [s.active]: !!value,
        [s.error]: !!errorMessage,
        [s.isLeftIcon]: type === 'search',
        [s.isRightIcon]: type === 'password' || isShowCrossIcon,
      },
      inputClassName
    ),
    inputWrapper: s.inputWrapper,
    label: cn(s.label, { [s.disabled]: disabled }),
    labelError: cn({ [s.error]: errorMessage }),
    leftIcon: s.left,
    rightIcon: s.right,
    root: cn(s.root, className),
  }

  const handleClickClearField = () => {
    onValueChange?.('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onValueChange?.(e.currentTarget.value)
  }

  const handlePressOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e)
    }
  }

  return (
    <div className={cnStyle.root}>
      {label && (
        <Typography as={'label'} className={cnStyle.label} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={cnStyle.inputWrapper}>
        {type === 'search' && (
          <div className={cnStyle.leftIcon}>
            <Icon height={'20'} iconId={'magnifier'} viewBox={'0 0 20 20'} width={'20'} />
          </div>
        )}
        <input
          className={cnStyle.input}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handlePressOnEnter}
          ref={ref}
          type={inputType}
          value={value}
          {...restProps}
        />
        {isShowCrossIcon && (
          <div className={cnStyle.rightIcon} onClick={handleClickClearField}>
            <Icon height={'20'} iconId={'cross'} viewBox={'0 0 20 20'} width={'20'} />
          </div>
        )}
        {type === 'password' && (
          <div onClick={handleClickShowPassword}>
            {showPassword ? (
              <span className={cnStyle.rightIcon}>
                <Icon height={'24'} iconId={'open_eye'} viewBox={'0 0 24 24'} width={'24'} />
              </span>
            ) : (
              <span className={cnStyle.rightIcon}>
                <Icon height={'24'} iconId={'close_eye'} viewBox={'0 0 24 24'} width={'24'} />
              </span>
            )}
          </div>
        )}
      </div>
      {!!errorMessage && (
        <Typography as={'span'} className={cnStyle.labelError} variant={'caption'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
})
