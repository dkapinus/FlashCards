import { ComponentPropsWithoutRef, ElementType } from 'react'

import { Typography } from '@/components/ui/typography'
import * as Radio from '@radix-ui/react-radio-group'

import r from './RadioGroup.module.scss'

export type RadioGroupProps<T extends ElementType = 'input'> = {
  active: boolean
  as?: T
  className?: string
  disabled: boolean
  title: string[]
} & ComponentPropsWithoutRef<T>

export const RadioGroup = <T extends ElementType = 'input'>(
  props: RadioGroupProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof RadioGroupProps<T>>
) => {
  const { active, as: Component = 'input', className, disabled, title, ...rest } = props

  return (
    <form>
      <Radio.Root
        {...rest}
        aria-label={'View density'}
        className={r.RadioGroupRoot}
        defaultValue={'default'}
      >
        <div className={r.RadioGroupWrapper}>
          <Radio.Item className={r.RadioGroupItem} id={'r1'} value={'default'}>
            <Radio.Indicator className={r.RadioGroupIndicator} />
          </Radio.Item>
          <label className={r.Label} htmlFor={'r1'}>
            <Typography variant={'body2'}>{props.title[1]}</Typography>
          </label>
        </div>
        <div className={r.RadioGroupWrapper}>
          <Radio.Item className={r.RadioGroupItem} id={'r2'} value={'comfortable'}>
            <Radio.Indicator className={r.RadioGroupIndicator} />
          </Radio.Item>
          <label className={r.Label} htmlFor={'r2'}>
            <Typography variant={'body2'}>{props.title[1]}</Typography>
          </label>
        </div>
        <div className={r.RadioGroupWrapper}>
          <Radio.Item className={r.RadioGroupItem} id={'r3'} value={'compact'}>
            <Radio.Indicator className={r.RadioGroupIndicator} />
          </Radio.Item>
          <label className={r.Label} htmlFor={'r3'}>
            <Typography variant={'body2'}>{props.title[2]}</Typography>
          </label>
        </div>
        <div className={r.RadioGroupWrapper}>
          <Radio.Item className={r.RadioGroupItem} id={'r4'} value={'default2'}>
            <Radio.Indicator className={r.RadioGroupIndicator} />
          </Radio.Item>
          <label className={r.Label} htmlFor={'r4'}>
            <Typography variant={'body2'}>{props.title[3]}</Typography>
          </label>
        </div>
        <div className={r.RadioGroupWrapper}>
          <Radio.Item className={r.RadioGroupItem} id={'r5'} value={'default3'}>
            <Radio.Indicator className={r.RadioGroupIndicator} />
          </Radio.Item>
          <label className={r.Label} htmlFor={'r5'}>
            <Typography variant={'body2'}>{props.title[4]}</Typography>
          </label>
        </div>
      </Radio.Root>
    </form>
  )
}
