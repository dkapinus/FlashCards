import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Header } from '@/components/ui/header'

import l from './Layout.module.scss'

type LayoutProps = ComponentPropsWithoutRef<'div'> & {
  avatar?: string
  isLoginIn: boolean
  marginTop?: CSSProperties['marginTop']
  name?: string
}

export const Layout = forwardRef<ElementRef<'div'>, LayoutProps>(
  ({ avatar, children, isLoginIn, name, ...rest }, ref) => {
    return (
      <div className={l.main} ref={ref} {...rest}>
        <Header avatar={avatar ? avatar : ''} isLoginIn={isLoginIn} name={name ? name : ''} />
        {children}
      </div>
    )
  }
)
