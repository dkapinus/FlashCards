import { Delete } from '@/components/ui/modal_icons/Delete'
import { Edit } from '@/components/ui/modal_icons/Edit'
import { Learn } from '@/components/ui/modal_icons/Learn'

import t from '../Table.module.scss'
import i from '@/components/ui/modal_icons/Modul_Icons.module.scss'
type ControlIconsProps = {
  disabledDelete?: boolean
  disabledEdit?: boolean
  disabledLearn?: boolean
  text?: string
}
export const ControlIcons = ({
  disabledDelete,
  disabledEdit,
  disabledLearn,
}: ControlIconsProps) => {
  return (
    <div className={t.ComponentsClass}>
      <Learn className={i.ButtonWithIcons} disabled={disabledLearn} variant={'secondary'}>
        <div>Hello3</div>
      </Learn>
      <Edit className={i.ButtonWithIcons} disabled={disabledEdit} variant={'secondary'}>
        <div>Hello2</div>
      </Edit>
      <Delete className={i.ButtonWithIcons} disabled={disabledDelete} variant={'secondary'}>
        <div>Hello1</div>
      </Delete>
    </div>
  )
}
