import f from '@/assets/images/haker.jpg'

import a from './Avatar.module.scss'

export const Avatar = () => {
  return (
    <div className={a.avatar}>
      <img alt={'Your avtar'} src={f} />
    </div>
  )
}
