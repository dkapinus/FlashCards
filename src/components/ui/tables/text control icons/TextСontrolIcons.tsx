import { RefIcons } from '@/components/ui/tables/text control icons/RefIcons'

import t from '../Tables.module.scss'

type TextWithManagementIconsProps = {
  edit: () => void
  name: string
  remove: () => void
}
export const TextControlIcons = ({ edit, name, remove }: TextWithManagementIconsProps) => {
  const removeHandler = () => remove()
  const editHandler = () => edit()

  return (
    <div className={t.ComponentsClass}>
      <span>{name}</span>
      <RefIcons edit={editHandler} remove={removeHandler} />
    </div>
  )
}
