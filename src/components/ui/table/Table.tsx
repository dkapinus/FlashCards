import { ComponentPropsWithoutRef, ElementType } from 'react'
import { useForm } from 'react-hook-form'

import { Controlled_Checkbox } from '@/components/controlled/controlled_checkbox'
import { BackgroundWText } from '@/components/ui/table/background_text/BackgroundWText'
import { ControlIcons } from '@/components/ui/table/control_icons/СontrolIcons'
import { Corner } from '@/components/ui/table/corner/Corner'
import { Rating } from '@/components/ui/table/rating/Rating'
import { ScreenCard } from '@/components/ui/table/screen_card/ScreenCard'
import { TextControlIcons } from '@/components/ui/table/text_control_icons/TextСontrolIcons'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import t from './Table.module.scss'

const loginSchema = z.object({
  checked: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export type TablesProps<T extends ElementType = 'div'> = {
  as?: T
  checked: (data: FormValues) => void
  edit: () => void
  learn: () => void
  remove: () => void
  text: string
} & ComponentPropsWithoutRef<T>

export const Table = <T extends ElementType = 'div'>(
  props: TablesProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TablesProps<T>>
) => {
  const { as: Component = 'div', checked, className, edit, learn, remove, text, ...rest } = props

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      checked: false,
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    // checked(data)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={t.Container} {...rest}>
        <BackgroundWText text={text} />
        <div className={t.ComponentsClass}>{text}</div>
        <Controlled_Checkbox control={control} label={text} name={'checked'} />
        <TextControlIcons text={text || ''} />
        <ControlIcons />
        <Rating />
        <ScreenCard text={text} />
        <div className={t.ComponentsClass}>
          <Controlled_Checkbox control={control} name={'checked'} />
        </div>
        <Corner name={text} />
      </div>
    </form>
  )
}
