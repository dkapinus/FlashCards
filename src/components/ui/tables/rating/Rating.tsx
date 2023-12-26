import { Icon } from '@/components/ui/icon/Icon'

import t from '../Tables.module.scss'

export const Rating = () => {
  return (
    <div className={t.ComponentsClass}>
      <Icon height={'16'} iconId={'starLike'} viewBox={' 0 0 16 16'} width={'16'} />
      <Icon height={'16'} iconId={'starLike'} viewBox={' 0 0 16 16'} width={'16'} />
      <Icon height={'16'} iconId={'starLike'} viewBox={' 0 0 16 16'} width={'16'} />
      <Icon height={'16'} iconId={'starLike'} viewBox={' 0 0 16 16'} width={'16'} />
      <Icon height={'16'} iconId={'starDislike'} viewBox={' 0 0 16 16'} width={'16'} />
    </div>
  )
}
