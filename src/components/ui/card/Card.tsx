import { ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './Card.module.scss'

export type CardProps = {} & ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...rest }, ref) => {
  return <div className={`${s.card} ${className}`} ref={ref} {...rest}></div>
})
