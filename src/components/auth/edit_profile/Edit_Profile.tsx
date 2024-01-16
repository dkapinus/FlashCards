import React, { useState } from 'react'

import { EditName } from '@/components/auth/edit_profile/edit_name/Edit_Name'
import { Name } from '@/components/auth/edit_profile/name/Name'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/header/user/avatar/Avatar'
import { Icon } from '@/components/ui/icon/Icon'
import { Layout } from '@/components/ui/layout/Layout'
import { Typography } from '@/components/ui/typography'

import e from './Edit_Profile.module.scss'
type Edit = {
  email?: string
  userName?: string
}
export const EditProfile: React.FC<Edit> = ({ email, userName }) => {
  const [edit, setEdit] = useState(true)
  const [name, setName] = useState(userName)
  const onChange = (e: string) => {
    setName(e)
  }
  const editName = () => {
    console.log('edit')
    setEdit(false)
  }
  const saveChanges = () => {
    setEdit(true)
    console.log('saveChanges')
  }
  const editPhoto = () => {
    console.log('editPhoto')
  }
  const logout = () => {
    console.log('logout')
  }

  return (
    <Layout isLoginIn>
      <Card className={edit ? e.editContainer : e.container}>
        <Typography variant={'large'}>Personal Information</Typography>

        <div className={e.avatarContainer}>
          <div className={e.avatarWrapper} style={{ position: 'relative' }}>
            <Avatar height={'96px'} width={'96px'} />
            <span className={e.editPhotoWrapper}>
              {edit ? (
                <Button className={e.editPhoto} onClick={editPhoto} variant={'secondary'}>
                  <Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />
                </Button>
              ) : (
                <></>
              )}
            </span>
          </div>
          {edit ? (
            <Name email={email} logout={logout} name={name} onClick={editName} />
          ) : (
            <EditName name={name} onValueChange={onChange} save={saveChanges} />
          )}
        </div>
      </Card>
    </Layout>
  )
}
