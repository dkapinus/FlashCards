import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ReactNode,
  Ref,
  forwardRef,
} from 'react'

import cn from 'classnames'

import s from './Card.module.scss'

type Props<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

export interface PolymorphRef<T extends ElementType> {
  ref?: Ref<ElementRef<T>>
}

type CardComponent = <T extends ElementType = 'div'>(props: Props<T> & PolymorphRef<T>) => ReactNode
export const Card: CardComponent = forwardRef(
  <T extends ElementType = 'div'>(
    { as, className, ...restProps }: Props<T>,
    ref: ElementRef<T>
  ) => {
    const Component: ElementType = as || 'div'

    return <Component className={cn(s.card, className)} ref={ref} {...restProps} />
  }
)
