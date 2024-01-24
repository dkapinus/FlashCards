import { ChangeEvent, useRef, useState } from 'react'

import deckPhoto from '@/assets/images/deckPhoto.svg'
import { Button } from '@/components/ui/button'
import { ChangeCoverButton } from '@/components/ui/button/changeCoverButton/changeCoverButton'
import { Input } from '@/components/ui/input'
import { Modals } from '@/components/ui/modals'
import { useCreateCardsMutation } from '@/services/cards_Api/Cards.service'
import { GetDeckById } from '@/services/decks_Api/Decks.types'

import s from '@/pages/decks/TableDecks.module.scss'

type AddNewCard = {
  deck: GetDeckById | undefined
}
export const ModalsAddNewCard = (props: AddNewCard) => {
  const { deck } = props

  const [createPackAnswer, setCreatePackAnswer] = useState('')
  const [createPackQuestion, setCreatePackQuestion] = useState('')
  const [photo, setPhoto] = useState<File>()
  const [createCard, cardCreationStatus] = useCreateCardsMutation({})
  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeAnswer = (value: string) => {
    setCreatePackAnswer(value)
  }

  const onChangeQuestion = (value: string) => {
    setCreatePackQuestion(value)
  }

  const cancelModals = () => {
    setCreatePackAnswer('')
    setCreatePackQuestion('')
  }
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const onUploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]

    setPhoto(file)
  }
  const onClickCreatePack = () => {
    createCard({
      answer: createPackAnswer,
      id: deck?.id,
      question: createPackQuestion,
      questionImg: photo,
    })
  }

  return (
    <Modals
      buttonTitle={'Add New Card'}
      buttonsInFooter={[
        <Button onClick={cancelModals} variant={'secondary'}>
          Cancel
        </Button>,
        <Button
          disabled={cardCreationStatus.isLoading}
          onClick={onClickCreatePack}
          variant={'primary'}
        >
          Add New Card
        </Button>,
      ]}
      modalTitle={'Add New Card'}
      showCloseButton
    >
      <Input label={'Question'} onValueChange={onChangeQuestion} />
      <div>
        <img className={s.createPhoto} src={deck?.cover || deckPhoto} />
      </div>
      <ChangeCoverButton
        inputRef={inputRef}
        onUploadPhoto={onUploadPhoto}
        selectFileHandler={selectFileHandler}
      />
      <div>
        <Input label={'Answer'} onValueChange={onChangeAnswer} />
      </div>
    </Modals>
  )
}
