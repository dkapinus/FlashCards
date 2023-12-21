import React from 'react'

import { Avatar } from '@/components/ui/header/user/avatar/Avatar'
import { Typography } from '@/components/ui/typography'

import h from './User.module.scss'

type UserNameType = {
  name: string
}
export const User: React.FC<UserNameType> = props => {
  const { name } = props
  const onClickHandler = () => {
    console.log('clickUser')
  }

  return (
    <>
      <div className={h.link} onClick={onClickHandler}>
        <Typography className={h.userName} variant={'subtitle1'}>
          {name}
        </Typography>
        <p className={h.iconContainer}></p>
      </div>
      <Avatar />
    </>
  )
}
