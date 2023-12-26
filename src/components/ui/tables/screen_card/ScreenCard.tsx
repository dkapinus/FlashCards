import s from '@/assets/images/screen.png'

import t from '../Tables.module.scss'
type ScreenCardProps = {
  text: string
}
export const ScreenCard = ({ text }: ScreenCardProps) => {
  return (
    <div className={t.ComponentsClass}>
      <span className={t.Screen}>
        <img alt={'screen'} src={s} />
      </span>
      <span>{text}</span>
    </div>
  )
}
