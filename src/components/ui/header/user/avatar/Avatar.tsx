import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import f from '@/assets/images/haker.jpg'

import a from './Avatar.module.scss'

type AvatarProps = ComponentPropsWithoutRef<'div'> & {
  avatar?: string
  height?: CSSProperties['height']
  width?: CSSProperties['width']
}

export const Avatar = forwardRef<ElementRef<'div'>, AvatarProps>(
  ({ avatar, children, height, width, ...rest }, ref) => {
    return (
      <div className={a.avatar} ref={ref} {...rest}>
        <img alt={'Your avtar'} src={avatar || f} style={{ height, width }} />
      </div>
    )
  }
)
