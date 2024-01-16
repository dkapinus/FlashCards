import { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react'

import { Avatar } from '@/components/ui/header/user/avatar/Avatar'
import { Icon } from '@/components/ui/icon/Icon'
import { Typography } from '@/components/ui/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import d from './DropDown-Menu-Profile.module.scss'

export type DropDownMenuProps<T extends ElementType = 'button'> = {
  as?: T
  avatar: string
  child?: ReactElement
  mail: string
  onClickProfile?: () => void
  singOut?: () => void
  userName: string
} & ComponentPropsWithoutRef<T>

export const DropDownMenu = <T extends ElementType = 'button'>(
  props: DropDownMenuProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof DropDownMenuProps<T>>
) => {
  const {
    as: Component = 'button',
    avatar,
    child,
    mail,
    onClickProfile,
    singOut,
    userName,
    ...rest
  } = props

  return (
    <DropdownMenu.Root {...rest}>
      <DropdownMenu.Trigger asChild style={{ marginLeft: '50%' }}>
        <button className={d.IconButton}>{child}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={d.DropdownMenuContent} sideOffset={5}>
          <div className={d.User}>
            <Avatar avatar={avatar} />
            <div className={d.UserInfo}>
              <Typography variant={'subtitle2'}>{userName}</Typography>
              <Typography className={d.UserMail} variant={'caption'}>
                {mail}
              </Typography>
            </div>
          </div>
          <hr className={d.Line} />
          <DropdownMenu.Item className={d.DropdownMenuItem} onClick={onClickProfile}>
            <span className={d.Icon}>
              <Icon height={'16'} iconId={'user'} viewBox={'0 0 16 16'} width={'16'} />
            </span>
            <Typography variant={'caption'}>My Profile</Typography>
          </DropdownMenu.Item>
          <hr className={d.Line} />
          <DropdownMenu.Item className={d.DropdownMenuItem} onClick={singOut}>
            <span className={d.Icon}>
              <Icon height={'16'} iconId={'log-out'} viewBox={'0 0 16 16'} width={'16'} />
            </span>
            <Typography variant={'caption'}> Sing Out</Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={d.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
