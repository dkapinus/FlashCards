import React from 'react'

import f from '@/assets/images/haker.jpg'
import { Icon } from '@/components/icon/Icon'
import { Typography } from '@/components/ui/typography'

import h from './User.module.scss'
type UserNameType = {
  name: string
}
export const User: React.FC<UserNameType> = props => {
  return (
    <>
      <div className={h.link}>
        <Typography className={h.userName} variant={'subtitle1'}>
          {props.name}
        </Typography>
        <div className={h.iconContainer}>
          <Icon height={'20'} iconId={'line'} viewBox={'0 0 33 1'} width={'100%'} />
        </div>
      </div>
      <div className={h.photo}>
        <img alt={'Your avtar'} className={h.avatar} src={f} />
      </div>
    </>
  )
}
