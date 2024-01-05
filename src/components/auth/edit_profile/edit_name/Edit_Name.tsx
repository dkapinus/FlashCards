import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import e from './Edit_Name.module.scss'
type EditNameType = {
  name: string
  onValueChange: (e: string) => void
  save: () => void
}
export const EditName: React.FC<EditNameType> = ({ name, onValueChange, save }) => {
  return (
    <div>
      {' '}
      <Input autoFocus label={'Nickname'} onValueChange={onValueChange} value={name} />
      <Button className={e.changes} onClick={save} variant={'primary'}>
        Save Changes
      </Button>
    </div>
  )
}
