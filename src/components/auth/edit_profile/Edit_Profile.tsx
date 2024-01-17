import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EditName } from '@/components/auth/edit_profile/edit_name/Edit_Name'
import { Name } from '@/components/auth/edit_profile/name/Name'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/header/user/avatar/Avatar'
import { Icon } from '@/components/ui/icon/Icon'
import { Layout } from '@/components/ui/layout/Layout'
import { Typography } from '@/components/ui/typography'
import { useLogoutMutation, useMeQuery, useUpdateMeMutation } from '@/services/auth/auth.service'

import e from './Edit_Profile.module.scss'

export const EditProfile = () => {
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [update] = useUpdateMeMutation()

  const [edit, setEdit] = useState(true)
  const [editPhoto, setEditPhoto] = useState(false)
  const [name, setName] = useState(data?.name || '')

  const navigate = useNavigate()
  const onChange = (e: string) => {
    setName(e)
  }
  const editName = () => {
    setEdit(false)
  }
  const saveChanges = () => {
    setEdit(true)
    const formData = new FormData()

    formData.append('name', name)
    update(formData)
  }
  const pushNewPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]

    const formData = new FormData()

    if (file) {
      formData.append('avatar', file)

      update(formData)
    }
    setEditPhoto(false)
  }
  const editPhotoS = () => {
    setEditPhoto(true)
  }
  const onClickLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Layout avatar={data?.avatar ? data.avatar : ''} isLoginIn name={data?.name}>
      <Card className={edit ? e.editContainer : e.container}>
        <Typography variant={'large'}>Personal Information</Typography>

        <div className={e.avatarContainer}>
          <div className={e.avatarWrapper} style={{ position: 'relative' }}>
            {data?.avatar ? (
              <img className={e.avatar} src={data.avatar} />
            ) : (
              <Avatar height={'96px'} width={'96px'} />
            )}

            <span className={e.editPhotoWrapper}>
              {edit && (
                <Button className={e.editPhoto} onClick={editPhotoS} variant={'secondary'}>
                  <Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />
                </Button>
              )}
            </span>
          </div>
          {editPhoto && <input onChange={pushNewPhoto} type={'file'} />}
          {edit ? (
            <Name
              email={data?.email || ''}
              logout={onClickLogout}
              name={data?.name || ''}
              onClick={editName}
            />
          ) : (
            <EditName name={name} onValueChange={onChange} save={saveChanges} />
          )}
        </div>
      </Card>
    </Layout>
  )
}
