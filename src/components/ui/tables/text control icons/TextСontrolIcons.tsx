import { CreateIcons } from '@/components/ui/tables/text control icons/CreateIcons'

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
      <CreateIcons edit={editHandler} remove={removeHandler} />
    </div>
  )
}
