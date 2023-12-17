import { ComponentPropsWithoutRef, ElementType } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from '@/components/ui/tabSwitcher/TabSwitcher.module.scss'

export type TabSwitcherProps<T extends ElementType = 'button'> = {
  as?: T
  disabled?: boolean
  value?: string
} & ComponentPropsWithoutRef<T>
export const TabSwitcher = <T extends ElementType = 'button'>(
  props: TabSwitcherProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TabSwitcherProps<T>>
) => {
  const { disabled, value } = props

  return (
    <Tabs.Root className={`${s.tabsRoot}`} defaultValue={'tab1'}>
      <Tabs.List aria-label={'Manage your account'} className={s.tabsList}>
        <Tabs.Trigger
          className={`${s.switcher} ${disabled ? s.disabledSwitcher : null}`}
          value={'tab1'}
        >
          {value}
        </Tabs.Trigger>{' '}
      </Tabs.List>
    </Tabs.Root>
  )
}
