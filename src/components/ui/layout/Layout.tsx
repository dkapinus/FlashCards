import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Header } from '@/components/ui/header'

import l from './Layout.module.scss'

type LayoutProps = ComponentPropsWithoutRef<'div'> & {
  isLoginIn: boolean
  marginTop?: CSSProperties['marginTop']
}

export const Layout = forwardRef<ElementRef<'div'>, LayoutProps>(
  ({ children, isLoginIn, ...rest }, ref) => {
    return (
      <div className={l.main} ref={ref} {...rest}>
        <Header isLoginIn={isLoginIn} name={'User'} />
        {children}
      </div>
    )
  }
)
