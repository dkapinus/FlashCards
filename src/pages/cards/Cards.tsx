import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { DropDownMenuOptions } from '@/components/ui/dropDown menu/dropDown-options'
import { Icon } from '@/components/ui/icon/Icon'
import { Input } from '@/components/ui/input'
import { Layout } from '@/components/ui/layout/Layout'
import { Modals } from '@/components/ui/modals'
import { Pagination } from '@/components/ui/pagination'
import { Rating } from '@/components/ui/table/rating/Rating'
import { Tables } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth/auth.service'
import {
  useCreateCardsMutation,
  useDeleteCardsMutation,
  useGetCardsQuery,
  useUpdateCardsMutation,
} from '@/services/cards_Api/Cards.service'
import { useGetDecksByIdQuery } from '@/services/decks_Api/Decks.service'

import s from './Cards.module.scss'

import deckPhoto from '../../assets/images/deckPhoto.svg'

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [view, setView] = useState('10')
  const [questionSearch, setInputValue] = useState('')
  const [createPackAnswer, setCreatePackAnswer] = useState('')
  const [createPackQuestion, setCreatePackQuestion] = useState('')
  const [deleteCard, cardDeleteStatus] = useDeleteCardsMutation()
  const [updatePack, deckUpdateStatus] = useUpdateCardsMutation({})

  const params = useParams()

  const deckId = params.id

  const navigate = useNavigate()

  const { data } = useGetCardsQuery({ currentPage, id: deckId, question: questionSearch })

  const { data: deck } = useGetDecksByIdQuery({ id: deckId })

  const { data: userData, isError } = useMeQuery()

  const userId = deck?.userId
  const [createCard, cardCreationStatus] = useCreateCardsMutation({})

  const isEmpty = data && data.pagination.totalItems === 0
  const isOwner = userId === userData?.id

  const DeleteCard = (id: string) => {
    deleteCard({ id: id })
  }

  const UpDatePack = (id: string) => {
    updatePack({ answer: createPackAnswer, id: id, question: createPackQuestion })
  }

  const setPage = (currentPage: number) => {
    if (currentPage > 0) {
      setCurrentPage(currentPage)
    }
  }

  const setInputSearch = (value: string) => {
    setInputValue(value)
  }

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

  const onClickCreatePack = () => {
    createCard({ answer: createPackAnswer, id: deckId, question: createPackQuestion })
  }

  const onClickLearnCards = () => {
    navigate('/learnCards/' + deckId)
  }

  const isLoginIn = !isError

  return (
    <>
      <Layout avatar={userData?.avatar || ''} isLoginIn={isLoginIn} name={userData?.name || ''}>
        <div className={s.container}>
          <div className={s.button_link}>
            <Button as={'a'} href={'/'} variant={'link'}>
              <Icon height={'24'} iconId={'arrow-back'} viewBox={'0 0 24 24'} width={'24'} />
              Back to Packs List
            </Button>
          </div>
          <div>
            <div className={s.name_Pack}>
              <Typography variant={'large'}>{deck?.name}</Typography>
              <DropDownMenuOptions
                child={
                  <Icon height={'24'} iconId={'dropDownIcon'} viewBox={'0 0 24 24'} width={'24'} />
                }
                className={s.dropDownIcon}
                edit={() => {}}
                // edit={<Modals> 1</Modals>}
                learn={() => {}}
                remove={() => {}}
              />
            </div>
            <div className={s.deckImage}>
              {' '}
              {deck?.cover ? <img src={deck?.cover} /> : <img src={deckPhoto} />}
            </div>
          </div>
          {isEmpty ? (
            <div>
              <div className={s.infoBlock_button}>
                <Typography className={s.infoText} variant={'body2'}>
                  This pack is empty.{isOwner && ' Click add new card to fill this pack'}
                </Typography>
              </div>
              {isOwner && (
                <div className={s.modal_empty_owner}>
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
                      <Input label={'Answer'} onValueChange={onChangeAnswer} />
                    </div>
                  </Modals>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className={s.button}>
                {isOwner ? (
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
                      <Input label={'Answer'} onValueChange={onChangeAnswer} />
                    </div>
                  </Modals>
                ) : (
                  <Button onClick={onClickLearnCards} variant={'primary'}>
                    Learn Cards
                  </Button>
                )}
              </div>
              <div>
                <Input
                  className={s.input}
                  onValueChange={setInputSearch}
                  placeholder={'search question'}
                  type={'search'}
                  value={questionSearch}
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
                  {data?.items.slice(0, +view).map(card => {
                    return (
                      <>
                        <Tables.Row key={card.id}>
                          <Tables.Cell>
                            <div className={s.question}>
                              {card?.question}
                              <img src={card?.questionImg} />
                            </div>
                          </Tables.Cell>
                          <Tables.Cell>
                            <div className={s.answer}>
                              {card?.answer}
                              <img src={card?.answerImg} />
                            </div>
                          </Tables.Cell>
                          <Tables.Cell>{new Date(card?.updated).toLocaleDateString()}</Tables.Cell>
                          <Tables.Cell>{<Rating />}</Tables.Cell>
                          <Tables.Cell>
                            {isOwner && (
                              <div>
                                <Modals
                                  buttonIcon={
                                    <Icon
                                      height={'16'}
                                      iconId={'delete'}
                                      viewBox={'0 0 16 16'}
                                      width={'16'}
                                    />
                                  }
                                  buttonsInFooter={[
                                    <Button onClick={cancelModals} variant={'secondary'}>
                                      Cancel
                                    </Button>,
                                    <Button
                                      disabled={cardDeleteStatus.isLoading}
                                      onClick={() => DeleteCard(card.id)}
                                      variant={'primary'}
                                    >
                                      Delete Pack
                                    </Button>,
                                  ]}
                                  className={s.modals}
                                  disabled={cardDeleteStatus.isLoading}
                                  modalTitle={'Delete Card'}
                                  showCloseButton
                                  variant={'secondary'}
                                >
                                  <div>
                                    Do you really want to remove Card Name? Card will be deleted.
                                  </div>
                                </Modals>
                                <Modals
                                  buttonIcon={
                                    <Icon
                                      height={'16'}
                                      iconId={'edit'}
                                      viewBox={'0 0 16 16'}
                                      width={'16'}
                                    />
                                  }
                                  buttonsInFooter={[
                                    <Button onClick={cancelModals} variant={'secondary'}>
                                      Cancel
                                    </Button>,
                                    <Button
                                      disabled={deckUpdateStatus.isLoading}
                                      onClick={() => UpDatePack(card.id)}
                                      variant={'primary'}
                                    >
                                      Save Changes
                                    </Button>,
                                  ]}
                                  className={s.modals}
                                  disabled={deckUpdateStatus.isLoading}
                                  modalTitle={'Edit Pack'}
                                  showCloseButton
                                  variant={'secondary'}
                                >
                                  <div>
                                    <Input
                                      defaultValue={card.question}
                                      label={'Question'}
                                      onValueChange={onChangeQuestion}
                                    />
                                  </div>

                                  <div>
                                    <Input
                                      defaultValue={card.answer}
                                      label={'Answer'}
                                      onValueChange={onChangeAnswer}
                                    />
                                  </div>
                                </Modals>
                              </div>
                            )}
                          </Tables.Cell>
                        </Tables.Row>
                      </>
                    )
                  })}
                </Tables.Body>
              </Tables.Root>
              <Pagination
                className={s.pagination}
                currentPage={data?.pagination.currentPage ?? 1}
                onChangePage={setPage}
                onValueChange={setView}
                options={[
                  { title: '1', value: '1' },
                  { title: '2', value: '2' },
                  { title: '3', value: '3' },
                  { title: '5', value: '5' },
                  { title: '10', value: '10' },
                ]}
                pageSize={data?.pagination.itemsPerPage ?? 10}
                totalCount={data?.pagination.totalItems ?? 0}
              />
            </>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Cards
