import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  useRef,
  useState,
} from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Icon } from '@/components/ui/icon/Icon'
import { Input } from '@/components/ui/input'
import { ModalsForOptions } from '@/components/ui/modals/modalsForOptoins/ModalsForOptions'
import { Typography } from '@/components/ui/typography'
import { useUpdateDecksMutation } from '@/services/decks_Api/Decks.service'
import { GetDeckById } from '@/services/decks_Api/Decks.types'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import d from './DropDown-Menu-Options.module.scss'
import s from '@/pages/pack/Pack.module.scss'

export type DropDownMenuOptionsProps<T extends ElementType = 'button'> = {
  as?: T
  child: ReactElement
  className?: string
  deck: GetDeckById | undefined
  edit: (event: Event) => void
  learn: () => void
  mail?: string
  remove: () => void
  userName?: string
} & ComponentPropsWithoutRef<T>

export const DropDownMenuOptions = <T extends ElementType = 'button'>(
  props: DropDownMenuOptionsProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof DropDownMenuOptionsProps<T>>
) => {
  const {
    as: Component = 'button',
    child,
    className,
    deck,
    edit,
    learn,
    mail,
    remove,
    userName,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const [updatePack] = useUpdateDecksMutation({})

  const [isPrivatePack, setIsPrivatePack] = useState<boolean | undefined>(deck?.isPrivate)

  const [packName, setPackName] = useState('')
  const [photo, setPhoto] = useState<File>()

  const onUploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]

    setPhoto(file)
  }
  const onChangeNamePack = (value: string) => {
    setPackName(value)
  }
  const onclickPrivatePack = () => {
    setIsPrivatePack(!isPrivatePack)
    console.log(`isPrivatePack after onclick: ${isPrivatePack}`)
  }

  const UpDatePack = (id: string, deckName: string) => {
    const formData = new FormData()

    if (photo) {
      formData.append('cover', photo)
    }
    // if (isPrivatePack) {
    //   formData.append('isPrivate', String(isPrivatePack))
    // }
    //
    // formData.append('name', deckName)
    //
    // updatePack(formData)

    updatePack({
      cover: formData,
      id: id,
      isPrivate: isPrivatePack,
      name: packName === '' ? deckName : packName,
    })
    console.log(formData)
    console.log(`isPrivatePack for server: ${isPrivatePack}`)
  }

  return (
    <DropdownMenu.Root {...rest}>
      {/*<DropdownMenu.Trigger asChild style={{ marginLeft: '50%' }}>*/}
      <DropdownMenu.Trigger asChild>
        <button className={`${d.IconButton} ${className}`}>{child}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={d.DropdownMenuContent} sideOffset={5}>
          <DropdownMenu.Item className={d.DropdownMenuItem} onClick={learn}>
            <span className={d.Icon}>
              <Icon height={'16'} iconId={'learn'} viewBox={'0 0 16 16'} width={'16'} />
            </span>
            <Typography variant={'caption'}>Learn</Typography>
          </DropdownMenu.Item>
          <hr className={d.Line} />
          <DropdownMenu.Item className={d.DropdownMenuItem} onSelect={edit}>
            <ModalsForOptions
              buttonTitle={
                <div className={d.modalTitle}>
                  <span className={d.Icon}>
                    <Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />
                  </span>
                  <Typography variant={'caption'}>Edit</Typography>
                </div>
              }
              buttonsInFooter={[
                <Button onClick={() => {}} variant={'secondary'}>
                  Cancel
                </Button>,
                <Button
                  onClick={() => {
                    if (deck) {
                      UpDatePack(deck.id, deck.name)
                    }
                  }}
                  variant={'primary'}
                >
                  Save changes
                </Button>,
              ]}
              modalTitle={'Edit Pack'}
              showCloseButton
            >
              <img alt={''} className={s.createPhoto} src={deck?.cover} />
              <div>
                <Button fullWidth onClick={selectFileHandler} variant={'secondary'}>
                  Change cover
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

              <div>
                <Input
                  defaultValue={deck?.name}
                  label={'Name Pack'}
                  onValueChange={onChangeNamePack}
                />
              </div>

              <div>
                <Checkbox
                  defaultChecked={deck?.isPrivate}
                  label={'Private pack'}
                  onClick={onclickPrivatePack}
                />
              </div>
            </ModalsForOptions>
          </DropdownMenu.Item>
          <hr className={d.Line} />
          <DropdownMenu.Item className={d.DropdownMenuItem} onClick={remove}>
            <span className={d.Icon}>
              <Icon height={'16'} iconId={'delete'} viewBox={'0 0 16 16'} width={'16'} />
            </span>
            <Typography variant={'caption'}>Delete</Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={d.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
