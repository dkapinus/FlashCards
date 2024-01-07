import { CreateIcons } from '@/components/ui/table/text_control_icons/CreateIcons'

import t from '../Table.module.scss'

type TextWithManagementIconsProps = {
  disabledDelete?: boolean
  disabledEdit?: boolean
  text?: string
}
export const TextControlIcons = ({
  disabledDelete,
  disabledEdit,
  text,
}: TextWithManagementIconsProps) => {
  return (
    <div className={t.ComponentsClass}>
      <span>{text}</span>
      <CreateIcons disabledDelete={disabledDelete} disabledEdit={disabledEdit} />
    </div>
  )
}
