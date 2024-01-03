import { Icon } from '@/components/ui/icon/Icon'

import t from '../Table.module.scss'

type CornerProps = {
  name: string
}
export const Corner = ({ name }: CornerProps) => {
  return (
    <div className={`${t.ComponentsClass} ${t.BackgroundComponent}`}>
      <span>{name}</span>
      <Icon height={'12'} iconId={'corner'} viewBox={'0 0 12 12'} width={'12'} />
    </div>
  )
}
