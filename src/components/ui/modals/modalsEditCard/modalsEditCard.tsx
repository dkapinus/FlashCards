import { ChangeEvent, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ChangeCoverButton } from '@/components/ui/button/changeCoverButton/changeCoverButton'
import { Icon } from '@/components/ui/icon/Icon'
import { Input } from '@/components/ui/input'
import { Modals } from '@/components/ui/modals'
import { useUpdateCardsMutation } from '@/services/cards_Api/Cards.service'
import { Item } from '@/services/cards_Api/Cards.types'

import s from '@/components/ui/modals/modalsEditCard/modalsEditCard.module.scss'

type EditCard = {
  card: Item
}
export const ModalsEditCard = (props: EditCard) => {
  const { card } = props
  const [updateCard, cardUpdateStatus] = useUpdateCardsMutation({})
  const [cardAnswer, setCardAnswer] = useState(card.answer)
  const [cardQuestion, setCardQuestion] = useState(card.question)
  const [answerPhoto, setAnswerPhoto] = useState<File | null>(null)
  const [questionPhoto, setQuestionPhoto] = useState<File | null>(null)
  const inputRefQuestion = useRef<HTMLInputElement>(null)
  const inputRefAnswer = useRef<HTMLInputElement>(null)

  console.log(card.answerImg)
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
  const onChangeAnswer = (value: string) => {
    setCardAnswer(value)
  }

  const onChangeQuestion = (value: string) => {
    setCardQuestion(value)
  }
  const UpDateCard = (id: string) => {
    const formData = new FormData()

    questionPhoto && formData.append('questionImg', questionPhoto)
    answerPhoto && formData.append('answerImg', answerPhoto)

    formData.append('question', cardQuestion)
    formData.append('answer', cardAnswer)

    updateCard({ body: formData, id: id })

    setAnswerPhoto(null)
    setQuestionPhoto(null)
  }

  return (
    <Modals
      buttonIcon={<Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />}
      buttonsInFooter={[
        <Button variant={'secondary'}>Cancel</Button>,
        <Button
          disabled={cardUpdateStatus.isLoading}
          onClick={() => UpDateCard(card.id)}
          variant={'primary'}
        >
          Save Changes
        </Button>,
      ]}
      className={s.modals}
      disabled={cardUpdateStatus.isLoading}
      modalTitle={'Edit Pack'}
      showCloseButton
      variant={'secondary'}
    >
      <div>
        <Input defaultValue={cardQuestion} label={'Question'} onValueChange={onChangeQuestion} />
      </div>
      {questionPhoto !== null ? (
        <div>
          <img
            alt={'Question Photo'}
            className={s.photo}
            src={URL.createObjectURL(questionPhoto)}
          />
        </div>
      ) : (
        <div>
          <img alt={'Question Photo'} className={s.photo} src={card.questionImg} />
        </div>
      )}
      <ChangeCoverButton
        inputRef={inputRefQuestion}
        name={'Select question image'}
        onUploadPhoto={onUploadQuestionPhoto}
        selectFileHandler={selectFileHandlerQuestion}
      />
      <div>
        <Input defaultValue={cardAnswer} label={'Answer'} onValueChange={onChangeAnswer} />
      </div>
      {answerPhoto !== null ? (
        <div>
          <img alt={'Answer Photo'} className={s.photo} src={URL.createObjectURL(answerPhoto)} />
        </div>
      ) : (
        <div>
          <img alt={'Answer Photo'} className={s.photo} src={card.answerImg} />
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
