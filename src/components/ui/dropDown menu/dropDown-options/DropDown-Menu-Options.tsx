import { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react'

import { Icon } from '@/components/ui/icon/Icon'
import { Typography } from '@/components/ui/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import d from './DropDown-Menu-Options.module.scss'

export type DropDownMenuOptionsProps<T extends ElementType = 'button'> = {
  as?: T
  child: ReactElement
  className?: string
  edit: () => void
  learn: () => void
  mail?: string
  remove: () => void
  userName?: string
} & ComponentPropsWithoutRef<T>

export const DropDownMenuOptions = <T extends ElementType = 'button'>(
  props: DropDownMenuOptionsProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof DropDownMenuOptionsProps<T>>
) => {
  const {
    as: Component = 'button',
    child,
    className,
    edit,
    learn,
    mail,
    remove,
    userName,
    ...rest
  } = props

  return (
    <DropdownMenu.Root {...rest}>
      {/*<DropdownMenu.Trigger asChild style={{ marginLeft: '50%' }}>*/}
      <DropdownMenu.Trigger asChild>
        <button className={`${d.IconButton} ${className}`}>{child}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={d.DropdownMenuContent} sideOffset={5}>
          <DropdownMenu.Item className={d.DropdownMenuItem} onClick={learn}>
            <span className={d.Icon}>
              <Icon height={'16'} iconId={'learn'} viewBox={'0 0 16 16'} width={'16'} />
            </span>
            <Typography variant={'caption'}>Learn</Typography>
          </DropdownMenu.Item>
          <hr className={d.Line} />
          <DropdownMenu.Item className={d.DropdownMenuItem} onClick={edit}>
            <span className={d.Icon}>
              <Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />
            </span>
            <Typography variant={'caption'}>Edit</Typography>
          </DropdownMenu.Item>
          <hr className={d.Line} />
          <DropdownMenu.Item className={d.DropdownMenuItem} onClick={remove}>
            <span className={d.Icon}>
              <Icon height={'16'} iconId={'delete'} viewBox={'0 0 16 16'} width={'16'} />
            </span>
            <Typography variant={'caption'}>Delete</Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={d.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
