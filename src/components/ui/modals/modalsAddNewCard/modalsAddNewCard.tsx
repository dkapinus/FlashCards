import { ChangeEvent, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ChangeCoverButton } from '@/components/ui/button/changeCoverButton/changeCoverButton'
import { Input } from '@/components/ui/input'
import { Modals } from '@/components/ui/modals'
import { useCreateCardsMutation } from '@/services/cards_Api/Cards.service'
import { GetDeckById } from '@/services/decks_Api/Decks.types'

import s from '@/components/ui/modals/modalsAddNewCard/modalsAddNewCard.module.scss'

type AddNewCard = {
  deck: GetDeckById | undefined
}
export const ModalsAddNewCard = (props: AddNewCard) => {
  const { deck } = props

  const [cardAnswer, setCardAnswer] = useState('')
  const [cardQuestion, setCardQuestion] = useState('')
  const [answerPhoto, setAnswerPhoto] = useState<File | null>(null)
  const [questionPhoto, setQuestionPhoto] = useState<File | null>(null)
  const [createCard, cardCreationStatus] = useCreateCardsMutation({})
  const inputRefQuestion = useRef<HTMLInputElement>(null)
  const inputRefAnswer = useRef<HTMLInputElement>(null)

  const onChangeAnswer = (value: string) => {
    setCardAnswer(value)
  }

  const onChangeQuestion = (value: string) => {
    setCardQuestion(value)
  }

  const cancelModals = () => {
    setCardAnswer('')
    setCardQuestion('')
  }
  const selectFileHandlerQuestion = () => {
    inputRefQuestion && inputRefQuestion.current?.click()
  }
  const selectFileHandlerAnswer = () => {
    inputRefAnswer && inputRefAnswer.current?.click()
  }
  const onUploadQuestionPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]

    setQuestionPhoto(file)
  }
  const onUploadAnswerPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]

    setAnswerPhoto(file)
  }
  const onClickCreateCard = () => {
    const formData = new FormData()

    questionPhoto && formData.append('questionImg', questionPhoto)
    answerPhoto && formData.append('answerImg', answerPhoto)

    formData.append('question', cardQuestion)
    formData.append('answer', cardAnswer)

    if (deck && deck.id) {
      createCard({ body: formData, id: deck.id })
    }
    setAnswerPhoto(null)
    setQuestionPhoto(null)
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
          onClick={onClickCreateCard}
          variant={'primary'}
        >
          Add New Card
        </Button>,
      ]}
      modalTitle={'Add New Card'}
      showCloseButton
    >
      <Input label={'Question'} onValueChange={onChangeQuestion} />
      {questionPhoto && (
        <div>
          <img
            alt={'Question Photo'}
            className={s.photo}
            src={URL.createObjectURL(questionPhoto)}
          />
        </div>
      )}
      <ChangeCoverButton
        inputRef={inputRefQuestion}
        name={'Select question image'}
        onUploadPhoto={onUploadQuestionPhoto}
        selectFileHandler={selectFileHandlerQuestion}
      />
      <div>
        <Input label={'Answer'} onValueChange={onChangeAnswer} />
      </div>
      {answerPhoto && (
        <div>
          <img alt={'Answer Photo'} className={s.photo} src={URL.createObjectURL(answerPhoto)} />
        </div>
      )}
      <ChangeCoverButton
        inputRef={inputRefAnswer}
        name={'Select answer image'}
        onUploadPhoto={onUploadAnswerPhoto}
        selectFileHandler={selectFileHandlerAnswer}
      />
    </Modals>
  )
}
