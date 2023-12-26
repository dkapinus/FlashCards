import { ComponentPropsWithoutRef, ElementType } from 'react'
import { useForm } from 'react-hook-form'

import { Controlled_Checkbox } from '@/components/controlled/controlled_checkbox'
import { BackgroundWText } from '@/components/ui/tables/background text/BackgroundWText'
import { ControlIcons } from '@/components/ui/tables/control icons/СontrolIcons'
import { Corner } from '@/components/ui/tables/corner/Corner'
import { Rating } from '@/components/ui/tables/rating/Rating'
import { ScreenCard } from '@/components/ui/tables/screen card/ScreenCard'
import { TextControlIcons } from '@/components/ui/tables/text control icons/TextСontrolIcons'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import t from './Tables.module.scss'

const loginSchema = z.object({
  rememberMe: z.boolean().default(false),
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

export const Tables = <T extends ElementType = 'div'>(
  props: TablesProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TablesProps<T>>
) => {
  const { as: Component = 'div', checked, className, edit, learn, remove, text, ...rest } = props

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    checked(data)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={t.Container} {...rest}>
        <BackgroundWText text={text} />
        <div className={t.ComponentsClass}>{text}</div>
        <Controlled_Checkbox control={control} label={text} name={'rememberMe'} />
        <TextControlIcons edit={edit} name={text} remove={remove} />
        <ControlIcons edit={edit} learn={learn} remove={remove} />
        <Rating />
        <ScreenCard text={text} />
        <div className={t.ComponentsClass}>
          <Controlled_Checkbox control={control} name={'rememberMe'} />
        </div>
        <Corner name={text} />
      </div>
    </form>
  )
}
