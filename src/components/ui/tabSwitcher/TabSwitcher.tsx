import { ComponentPropsWithoutRef, ElementType } from 'react'

import { Typography } from '@/components/ui/typography'
import * as Tabs from '@radix-ui/react-tabs'

import s from '@/components/ui/tabSwitcher/TabSwitcher.module.scss'

export type TabType = {
  disabled?: boolean
  title: string
  /** A unique value that associates the trigger with a content. */
  value: string
}

type CommonTabsProps<T extends ElementType = 'button'> = {
  defaultValue?: string
  onValueChange?: (value: string) => void
  tabs: TabType[]
  value?: string
} & ComponentPropsWithoutRef<T>

export const TabSwitcher = <T extends ElementType = 'button'>(
  props: CommonTabsProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CommonTabsProps<T>>
) => {
  const { defaultValue, onValueChange, tabs, ...rest } = props

  return (
    <Tabs.Root
      className={`${s.tabsRoot}`}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      {...rest}
    >
      <Tabs.List aria-label={'Tabs list'} className={s.tabsList}>
        <Typography variant={'body1'}>
          {tabs.map((tab, index) => {
            return (
              <Tabs.Trigger
                className={`${s.tabTrigger} ${tab.disabled ? s.disabledTrigger : null}`}
                disabled={tab.disabled}
                key={index}
                value={tab.value}
              >
                {tab.title}
              </Tabs.Trigger>
            )
          })}
        </Typography>
      </Tabs.List>
    </Tabs.Root>
  )
}
