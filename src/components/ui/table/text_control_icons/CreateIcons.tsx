import { Icon } from '@/components/ui/icon/Icon'
type RefIconsProps = {
  edit: () => void
  remove: () => void
}
export const CreateIcons = ({ edit, remove }: RefIconsProps) => {
  const editHandler = () => edit()
  const removeHandler = () => remove()

  return (
    <>
      <span onClick={editHandler}>
        <Icon height={'16'} iconId={'edit'} viewBox={' 0 0 16 16'} width={'16'} />
      </span>
      <span onClick={removeHandler}>
        <Icon height={'16'} iconId={'delete'} viewBox={' 0 0 16 16'} width={'16'} />
      </span>
    </>
  )
}
