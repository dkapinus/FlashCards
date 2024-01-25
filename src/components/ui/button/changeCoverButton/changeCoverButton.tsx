import { ChangeEvent, RefObject } from 'react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon/Icon'
import { Input } from '@/components/ui/input'

type ChangeCover = {
  inputRef: RefObject<HTMLInputElement>
  name?: string
  onUploadPhoto: (event: ChangeEvent<HTMLInputElement>) => void
  selectFileHandler: () => void
}
export const ChangeCoverButton = (props: ChangeCover) => {
  const { inputRef, name, onUploadPhoto, selectFileHandler } = props

  return (
    <div>
      <Button fullWidth onClick={selectFileHandler} variant={'secondary'}>
        <Icon height={'16'} iconId={'changeCover'} viewBox={'0 0 16 16'} width={'16'} />
        {name ? name : 'Change cover'}
      </Button>
      <div>
        <Input
          onChange={onUploadPhoto}
          ref={inputRef}
          style={{ display: 'none', height: '0' }}
          type={'file'}
        />
      </div>
    </div>
  )
}
