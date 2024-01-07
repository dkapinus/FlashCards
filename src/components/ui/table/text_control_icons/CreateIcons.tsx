import { Delete } from '@/components/ui/modal_icons/Delete'
import { Edit } from '@/components/ui/modal_icons/Edit'

import i from '@/components/ui/modal_icons/Modul_Icons.module.scss'
type CreateIconsProps = {
  disabledDelete?: boolean
  disabledEdit?: boolean
}
export const CreateIcons = ({ disabledDelete, disabledEdit }: CreateIconsProps) => {
  return (
    <>
      <Edit className={i.ButtonWithIcons} disabled={disabledEdit} variant={'secondary'}>
        <div>Hello2</div>
      </Edit>
      <Delete className={i.ButtonWithIcons} disabled={disabledDelete} variant={'secondary'}>
        <div>Hello1</div>
      </Delete>
    </>
  )
}
