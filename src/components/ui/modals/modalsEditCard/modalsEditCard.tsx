import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon/Icon'
import { Input } from '@/components/ui/input'
import { Modals } from '@/components/ui/modals'
import { useUpdateCardsMutation } from '@/services/cards_Api/Cards.service'
import { Item } from '@/services/cards_Api/Cards.types'

import s from '@/pages/pack/Pack.module.scss'

type EditCard = {
  card: Item
}
export const ModalsEditCard = (props: EditCard) => {
  const { card } = props
  const [updateCard, cardUpdateStatus] = useUpdateCardsMutation({})
  const [createPackAnswer, setCreatePackAnswer] = useState('')
  const [createPackQuestion, setCreatePackQuestion] = useState('')
  const onChangeAnswer = (value: string) => {
    setCreatePackAnswer(value)
  }

  const onChangeQuestion = (value: string) => {
    setCreatePackQuestion(value)
  }
  const UpDatePack = (id: string) => {
    updateCard({ answer: createPackAnswer, id: id, question: createPackQuestion })
  }

  return (
    <Modals
      buttonIcon={<Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />}
      buttonsInFooter={[
        // <Button onClick={cancelModals} variant={'secondary'}>
        <Button variant={'secondary'}>Cancel</Button>,
        <Button
          disabled={cardUpdateStatus.isLoading}
          onClick={() => UpDatePack(card.id)}
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
        <Input defaultValue={card.question} label={'Question'} onValueChange={onChangeQuestion} />
      </div>

      <div>
        <Input defaultValue={card.answer} label={'Answer'} onValueChange={onChangeAnswer} />
      </div>
    </Modals>
  )
}
