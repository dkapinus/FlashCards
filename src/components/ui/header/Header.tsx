import { ComponentPropsWithoutRef, ElementType } from 'react'

import { Button } from '@/components/ui/button'
import { User } from '@/components/ui/header/user/User'
import { Icon } from '@/components/ui/icon/Icon'
import { Typography } from '@/components/ui/typography'

import h from './Header.module.scss'

export type HeaderProps<T extends ElementType = 'header'> = {
  as?: T
  isLoginIn: boolean
  name: string
} & ComponentPropsWithoutRef<T>

export const Header = <T extends ElementType = 'header'>(
  props: HeaderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof HeaderProps<T>>
) => {
  const { active, as: Component = 'header', isLoginIn, name, ...rest } = props

  return (
    <header {...rest} className={h.container}>
      <div className={h.wrapper}>
        <Icon height={'36'} iconId={'incubator'} viewBox={'0 0 157 36'} width={'157'} />
        <div className={h.singWrapper}>
          {isLoginIn ? (
            <User name={name} />
          ) : (
            <Button className={'link'} variant={'primary'}>
              <Typography variant={'subtitle1'}>Sign In</Typography>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
