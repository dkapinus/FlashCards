import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon/Icon'

import t from '@/components/ui/table/Table.module.scss'
type RefIconsProps = {
  edit: () => void
  remove: () => void
}
export const CreateIcons = ({ edit, remove }: RefIconsProps) => {
  const editHandler = () => edit()
  const removeHandler = () => remove()

  return (
    <>
      <Button className={t.ButtonWithIcons} onClick={editHandler} variant={'secondary'}>
        <Icon height={'16'} iconId={'edit'} viewBox={' 0 0 16 16'} width={'16'} />
      </Button>
      <Button className={t.ButtonWithIcons} onClick={removeHandler} variant={'secondary'}>
        <Icon height={'16'} iconId={'delete'} viewBox={' 0 0 16 16'} width={'16'} />
      </Button>
    </>
  )
}
