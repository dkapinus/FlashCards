import { ComponentPropsWithoutRef, ElementType } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { BackgroundWText } from '@/components/ui/tables/background text/BackgroundWText'
import { CheckboxWText } from '@/components/ui/tables/checkbox with name/CheckboxWText'
import { ControlIcons } from '@/components/ui/tables/control icons/СontrolIcons'
import { Corner } from '@/components/ui/tables/corner/Corner'
import { Rating } from '@/components/ui/tables/rating/Rating'
import { ScreenCard } from '@/components/ui/tables/screen card/ScreenCard'
import { TextControlIcons } from '@/components/ui/tables/text control icons/TextСontrolIcons'

import t from './Tables.module.scss'

export type TablesProps<T extends ElementType = 'div'> = {
  as?: T
  edit: () => void
  learn: () => void
  remove: () => void
  text: string
} & ComponentPropsWithoutRef<T>

export const Tables = <T extends ElementType = 'div'>(
  props: TablesProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TablesProps<T>>
) => {
  const { as: Component = 'div', className, edit, learn, remove, text, ...rest } = props

  return (
    <div className={t.Container} {...rest}>
      {<BackgroundWText text={text} />}
      <div className={t.ComponentsClass}>{text}</div>
      <CheckboxWText text={text} />
      <TextControlIcons edit={edit} name={text} remove={remove} />
      <ControlIcons edit={edit} learn={learn} remove={remove} />
      <Rating />
      <ScreenCard text={text} />
      <div className={t.ComponentsClass}>
        <Checkbox />
      </div>
      <Corner name={text} />
    </div>
  )
}
