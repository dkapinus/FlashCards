import { ComponentPropsWithoutRef, ElementType } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { DropDownMenu } from '@/components/ui/dropDown menu/dropDown-profile'
import { User } from '@/components/ui/header/user/User'
import { Icon } from '@/components/ui/icon/Icon'
import { Typography } from '@/components/ui/typography'
import { useLogoutMutation } from '@/services/auth/auth.service'

import h from './Header.module.scss'

export type HeaderProps<T extends ElementType = 'header'> = {
  as?: T
  avatar: string
  isLoginIn: boolean
  name: string
} & ComponentPropsWithoutRef<T>

export const Header = <T extends ElementType = 'header'>(
  props: HeaderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof HeaderProps<T>>
) => {
  const { active, as: Component = 'header', avatar, isLoginIn, name, ...rest } = props

  const [logout] = useLogoutMutation()

  const navigate = useNavigate()

  const singOut = () => {
    logout()
    navigate('/login')
  }

  const onClickProfile = () => {
    navigate('/profile')
  }

  return (
    <header {...rest} className={h.container}>
      <div className={h.wrapper}>
        <Icon height={'36'} iconId={'incubator'} viewBox={'0 0 157 36'} width={'157'} />
        <div className={h.singWrapper}>
          {isLoginIn ? (
            <DropDownMenu
              avatar={avatar}
              child={<User avatar={avatar} name={name} />}
              mail={''}
              onClickProfile={onClickProfile}
              singOut={singOut}
              userName={name}
            />
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
