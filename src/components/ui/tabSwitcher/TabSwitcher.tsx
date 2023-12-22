import { ComponentPropsWithoutRef, ElementType } from 'react'

import { Typography } from '@/components/ui/typography'
import * as Tabs from '@radix-ui/react-tabs'

import s from '@/components/ui/tabSwitcher/TabSwitcher.module.scss'

export type TabSwitcherProps<T extends ElementType = 'button'> = {
  as?: T
  disabled?: boolean
  name: string
} & ComponentPropsWithoutRef<T>
export const TabSwitcher = <T extends ElementType = 'button'>(
  props: TabSwitcherProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TabSwitcherProps<T>>
) => {
  const { disabled, name } = props

  return (
    <Tabs.Root className={`${s.tabsRoot}`} defaultValue={'tab1'}>
      <Tabs.List aria-label={'Manage your account'} className={s.tabsList}>
        <Typography variant={'body1'}>
          <Tabs.Trigger
            className={`${s.switcher} ${disabled ? s.disabledSwitcher : null}`}
            value={'tab1'}
          >
            {name}
          </Tabs.Trigger>{' '}
        </Typography>
      </Tabs.List>
    </Tabs.Root>
  )
}
