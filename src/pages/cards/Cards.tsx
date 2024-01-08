import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon/Icon'
import { Input } from '@/components/ui/input'
import { Layout } from '@/components/ui/layout/Layout'
import { Modals } from '@/components/ui/modals'
import { Tables } from '@/components/ui/tables'
import { useCreateCardsMutation, useGetCardsQuery } from '@/services/Cards.service'

import s from './Cards.module.scss'

const Cards = () => {
  const [name, setInputValue] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [createPack, setCreatePack] = useState('')

  const { userId } = useParams()
  const { data } = useGetCardsQuery({ id: userId, question: name })
  const [createCard, cardCreationStatus] = useCreateCardsMutation({})

  const setInputSearch = (value: string) => {
    setInputValue(value)
  }
  const handleOpenCallback = () => {
    setModalOpen(!isModalOpen)
  }

  const onChangeNamePack = (value: string) => {
    setCreatePack(value)
  }

  const cancelAddNewPack = () => {
    setCreatePack('')
    setModalOpen(false)
  }

  const onClickCreatePack = () => {
    createCard({ answer: createPack, id: userId, question: 'jjjjjjjjjj' })
    setCreatePack('')
    setModalOpen(false)
  }

  return (
    <>
      <Layout isLoginIn>
        <div className={s.container}>
          <Button as={'a'} href={'/'} variant={'link'}>
            <Icon height={'24'} iconId={'arrow-back'} viewBox={'0 0 24 24'} width={'24'} />
            Back to Packs List
          </Button>
          <div className={s.button}>
            <Modals
              buttonTitle={'Add New Card'}
              isModalOpen={isModalOpen}
              modalTitle={'Add New Card'}
              setOpenCallback={handleOpenCallback}
              showCloseButton
            >
              <Input label={'Choose a question format'} onValueChange={onChangeNamePack} />

              <div>
                <Button onClick={cancelAddNewPack} variant={'secondary'}>
                  Cancel
                </Button>
                <Button
                  disabled={cardCreationStatus.isLoading}
                  onClick={onClickCreatePack}
                  variant={'primary'}
                >
                  Add New Pack
                </Button>
              </div>
            </Modals>
          </div>
          <div>
            <Input
              className={s.input}
              onValueChange={setInputSearch}
              type={'search'}
              value={name}
            />
          </div>
          <Tables.Root>
            <Tables.Head>
              <Tables.Row>
                <Tables.Cell>Question</Tables.Cell>
                <Tables.Cell>Answer</Tables.Cell>
                <Tables.Cell>Updated</Tables.Cell>
                <Tables.Cell>Crade</Tables.Cell>
              </Tables.Row>
            </Tables.Head>
            <Tables.Body>
              {data?.items.map(card => {
                return (
                  <>
                    <Tables.Row key={card.deckId}>
                      <Tables.Cell>{card?.question}</Tables.Cell>
                      <Tables.Cell>{card?.answer}</Tables.Cell>
                      <Tables.Cell>{new Date(card?.updated).toLocaleDateString()}</Tables.Cell>
                      <Tables.Cell>{card?.grade}</Tables.Cell>
                    </Tables.Row>
                  </>
                )
              })}
            </Tables.Body>
          </Tables.Root>
        </div>
      </Layout>
    </>
  )
}

export default Cards
