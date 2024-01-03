import t from '../Table.module.scss'

type BackgroundWTextProps = {
  text: string
}

export const BackgroundWText = ({ text }: BackgroundWTextProps) => {
  return <span className={`${t.ComponentsClass} ${t.BackgroundComponent}`}>{text}</span>
}
