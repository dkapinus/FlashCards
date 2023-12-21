import { ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { Typography } from '@/components/ui/typography'
import * as SliderPrimitive from '@radix-ui/react-slider'

import s from './Slider.module.scss'

export type RangeSliderProps<T extends ElementType = 'input'> = {
  as?: T
  propsValue: number[]
  valueChange: (e: number[]) => void
} & ComponentPropsWithoutRef<T>

export const Slider = <T extends ElementType = 'input'>(
  props: RangeSliderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof RangeSliderProps<T>>
) => {
  const { max, propsValue, step, valueChange, ...rest } = props
  const [value, setValue] = useState<number[]>(propsValue)
  const onValueChange = (e: number[]) => {
    setValue(e)
    valueChange(e)
  }

  return (
    <div>
      <p className={s.theme}>Dark Theme</p>
      <div className={s.container}>
        <span>
          <Typography className={s.value} variant={'body1'}>
            {value?.[0]}
          </Typography>
        </span>
        <SliderPrimitive.Root
          className={s.root}
          max={max}
          onValueChange={onValueChange}
          step={step}
          {...rest}
          value={[value?.[0] ?? 0, value?.[1] ?? max ?? 0]}
        >
          <SliderPrimitive.Track className={s.track}>
            <SliderPrimitive.Range className={s.range} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className={s.thumb} />
          <SliderPrimitive.Thumb className={s.thumb} />
        </SliderPrimitive.Root>
        <span>
          <Typography className={s.value} variant={'body1'}>
            {value?.[1]}
          </Typography>
        </span>
      </div>
    </div>
  )
}
