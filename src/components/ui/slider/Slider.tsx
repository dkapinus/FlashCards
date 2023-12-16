import { ComponentPropsWithoutRef, ElementRef, ElementType, forwardRef, useState } from 'react'

import { Typography } from '@/components/ui/typography'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './Slider.module.scss'
export type RangeSliderProps<T extends ElementType = 'input'> = {
  as?: T
  className?: string
  propsValue: number[]
} & ComponentPropsWithoutRef<T>

export const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  Omit<ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'propsValue'> & {
    propsValue: number[]
  }
>(({ className, max, propsValue, step, ...rest }, ref) => {
  const [value, setValue] = useState<number[]>(propsValue)
  const onValueChange = (e: number[]) => {
    setValue(e)
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
          className={clsx(s.root, className)}
          max={max}
          onValueChange={onValueChange}
          ref={ref}
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
})
