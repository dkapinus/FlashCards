import { ComponentPropsWithoutRef, ElementType, useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from '@/components/ui/checkbox/CheckBox.module.scss'

export type CheckboxProps<T extends ElementType = 'input'> = {
  as?: T
  checked?: boolean
  disabled?: boolean
  id: string
  label?: string
  onCheckedChange?: (checked: boolean) => void
} & ComponentPropsWithoutRef<T>

export const CheckBox = <T extends ElementType = 'input'>(
  props: CheckboxProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CheckboxProps<T>>
) => {
  const { as: Component = 'input', checked, disabled, label, ...rest } = props
  const [check, setCheck] = useState(checked)
  const [focusCheckbox, setFocusCheckbox] = useState(false)
  const changeCheckHandler = () => {
    setCheck(!check)
  }
  const checkboxFocusWrapperHandler = () => {
    if (disabled === true) {
      return
    }
    setFocusCheckbox(true)
  }
  const checkboxUnFocusWrapperHandler = () => {
    setFocusCheckbox(false)
  }

  return (
    <form
      className={s.form}
      onBlur={checkboxUnFocusWrapperHandler}
      onClick={checkboxFocusWrapperHandler}
    >
      <div className={`${s.checkboxWrapper} ${focusCheckbox ? s.focusCheckbox : null}`}>
        <Checkbox.Root
          checked={check}
          className={`${s.checkboxRoot} ${check ? s.checked : s.notChecked} 
          ${disabled && !check ? s.disabled : null} `}
          disabled={disabled}
          id={rest.id}
          onCheckedChange={changeCheckHandler}
        >
          <Checkbox.Indicator
            className={`${s.checkboxIndicator} ${disabled ? s.disabledIndicator : null}`}
          >
            {check && (
              <CheckIcon className={`${s.checkboxIcon} ${disabled ? s.disabledIcon : null}`} />
            )}
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label className={`${s.label} ${disabled ? s.disabledLabel : null}`} htmlFor={rest.id}>
        {label}
      </label>
    </form>
  )
}
