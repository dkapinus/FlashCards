import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon/Icon'

import t from '../Table.module.scss'

type ControlIconsProps = {
  edit: () => void
  learn: () => void
  remove: () => void
}
export const ControlIcons = ({ edit, learn, remove }: ControlIconsProps) => {
  const learnHandler = () => learn()
  const editHandler = () => edit()
  const removeHandler = () => remove()

  return (
    <div className={t.ComponentsClass}>
      <Button className={t.ButtonWithIcons} onClick={learnHandler} variant={'secondary'}>
        <Icon height={'16'} iconId={'learn'} viewBox={' 0 0 16 16'} width={'16'} />
      </Button>
      <Button className={t.ButtonWithIcons} onClick={editHandler} variant={'secondary'}>
        <Icon height={'16'} iconId={'edit'} viewBox={' 0 0 16 16'} width={'16'} />
      </Button>
      <Button className={t.ButtonWithIcons} onClick={removeHandler} variant={'secondary'}>
        <Icon height={'16'} iconId={'delete'} viewBox={' 0 0 16 16'} width={'16'} />
      </Button>
    </div>
  )
}
