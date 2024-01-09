import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon/Icon'
import { Input } from '@/components/ui/input'
import { Layout } from '@/components/ui/layout/Layout'
import { Modals } from '@/components/ui/modals'
import { Tables } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import {
  useCreateCardsMutation,
  useDeleteCardsMutation,
  useGetCardsQuery,
  useUpdateCardsMutation,
} from '@/services/cards_Api/Cards.service'

import s from './Cards.module.scss'

const Cards = () => {
  const [name, setInputValue] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [createPackAnswer, setCreatePackAnswer] = useState('')
  const [createPackQuestion, setCreatePackQuestion] = useState('')
  const [deleteCard, cardDeleteStatus] = useDeleteCardsMutation()
  const [updatePack, deckUpdateStatus] = useUpdateCardsMutation({})

  const params = useParams()

  const userId = params.id

  const { data } = useGetCardsQuery({ id: userId })
  const [createCard, cardCreationStatus] = useCreateCardsMutation({})

  const isEmpty = data && data.pagination.totalItems === 0
  const isOwner = ''

  const DeleteCard = (id: string) => {
    deleteCard({ id: id })
  }

  const UpDatePack = (id: string) => {
    updatePack({ id: id, question: 'Italy' })
  }

  const setInputSearch = (value: string) => {
    setInputValue(value)
  }
  const handleOpenCallback = () => {
    setModalOpen(!isModalOpen)
  }

  const onChangeAnswer = (value: string) => {
    setCreatePackAnswer(value)
  }

  const onChangeQuestion = (value: string) => {
    setCreatePackQuestion(value)
  }

  const cancelAddNewPack = () => {
    setCreatePackAnswer('')
    setModalOpen(false)
  }

  const onClickCreatePack = () => {
    createCard({ answer: createPackAnswer, id: userId, question: createPackQuestion })
    setCreatePackAnswer('')
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
          {isEmpty ? (
            <div className={s.infoBlock}>
              <Typography className={s.infoText} variant={'body2'}>
                This pack is empty.{isOwner && ' Click add new card to fill this pack'}
              </Typography>
              {isOwner && <Button variant={'primary'}>Add New Card</Button>}
            </div>
          ) : (
            <>
              <div className={s.button}>
                <Modals
                  buttonTitle={'Add New Card'}
                  isModalOpen={isModalOpen}
                  modalTitle={'Add New Card'}
                  setOpenCallback={handleOpenCallback}
                  showCloseButton
                >
                  <Input label={'Question'} onValueChange={onChangeQuestion} />
                  <Input label={'Answer'} onValueChange={onChangeAnswer} />

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
                    <Tables.Cell></Tables.Cell>
                  </Tables.Row>
                </Tables.Head>
                <Tables.Body>
                  {data?.items.map(card => {
                    return (
                      <>
                        <Tables.Row key={card.id}>
                          <Tables.Cell>{card?.question}</Tables.Cell>
                          <Tables.Cell>{card?.answer}</Tables.Cell>
                          <Tables.Cell>{new Date(card?.updated).toLocaleDateString()}</Tables.Cell>
                          <Tables.Cell>{card?.grade}</Tables.Cell>
                          <Tables.Cell>
                            <div>
                              <Button
                                className={s.modals}
                                disabled={cardDeleteStatus.isLoading}
                                onClick={() => DeleteCard(card.id)}
                                variant={'secondary'}
                              >
                                <Icon
                                  height={'16'}
                                  iconId={'delete'}
                                  viewBox={'0 0 16 16'}
                                  width={'16'}
                                />
                              </Button>
                              <Button
                                className={s.modals}
                                disabled={deckUpdateStatus.isLoading}
                                onClick={() => UpDatePack(card.id)}
                                variant={'secondary'}
                              >
                                <Icon
                                  height={'16'}
                                  iconId={'edit'}
                                  viewBox={'0 0 16 16'}
                                  width={'16'}
                                />
                              </Button>
                            </div>
                          </Tables.Cell>
                        </Tables.Row>
                      </>
                    )
                  })}
                </Tables.Body>
              </Tables.Root>
            </>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Cards
