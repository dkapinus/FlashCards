import React from 'react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon/Icon'
import { Typography } from '@/components/ui/typography'

import n from './Name.module.scss'

type EditNameType = {
  email: string
  logout: () => void
  name: string
  onClick: () => void
}
export const Name: React.FC<EditNameType> = ({ email, logout, name, onClick }) => {
  return (
    <>
      <span className={n.inputWrapper}>
        <Typography variant={'h1'}>{name}</Typography>
        <Button className={n.editName} onClick={onClick} variant={'secondary'}>
          <Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />
        </Button>
      </span>
      <span>
        <Typography className={n.email} variant={'body2'}>
          {email}
        </Typography>
      </span>
      <span className={n.logout}>
        <Button onClick={logout} variant={'secondary'}>
          <Icon height={'16'} iconId={'log-out'} viewBox={'0 0 16 16'} width={'16'} />
          <Typography variant={'subtitle2'}>Logout</Typography>
        </Button>
      </span>
    </>
  )
}
