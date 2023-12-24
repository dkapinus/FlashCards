import { Checkbox } from '@/components/ui/checkbox'

import t from '../Tables.module.scss'

type CheckboxWTextProps = {
  text: string
}
export const CheckboxWText = ({ text }: CheckboxWTextProps) => {
  return (
    <div className={t.ComponentsClass}>
      <Checkbox />
      <span>{text}</span>
    </div>
  )
}
