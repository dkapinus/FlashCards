import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Icon } from '@/components/ui/icon/Icon'
import { Input } from '@/components/ui/input'
import { Layout } from '@/components/ui/layout/Layout'
import { Modals } from '@/components/ui/modals'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tabSwitcher'
import { Tables } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import {
  useCreateDecksMutation,
  useDeleteDecksMutation,
  useGetDecksQuery,
  useUpdateDecksMutation,
} from '@/services/Decks.service'

import s from './Decks.module.scss'

export const Decks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [view, setView] = useState('10')
  const [name, setInputValue] = useState('')
  const [createPack, setCreatePack] = useState('')
  const [minCardsCount, setMinCardsCount] = useState(0)
  const [maxCardsCount, setMaxCardsCount] = useState(0)
  const [isModalOpen, setModalOpen] = useState(false)
  const [openCards, setOpenCards] = useState(false)

  const onClickCards = () => {
    setOpenCards(true)
  }
  const setPage = (currentPage: number) => {
    if (currentPage > 0) {
      setCurrentPage(currentPage)
    }
  }

  const setInputSearch = (value: string) => {
    setInputValue(value)
  }

  const onClickCreatePack = () => {
    createDeck({ name: createPack })
    setCreatePack('')
    setModalOpen(false)
  }

  const { data, error, isLoading } = useGetDecksQuery({
    currentPage,
    maxCardsCount,
    minCardsCount,
    name,
  })
  const [createDeck, deckCreationStatus] = useCreateDecksMutation()
  const [deletePack, deckDeleteStatus] = useDeleteDecksMutation()
  const [updatePack, deckUpdateStatus] = useUpdateDecksMutation({})

  const filterCards = (e: number[]) => {
    setMinCardsCount(e[0])
    setMaxCardsCount(e[1])
  }
  const DeletePack = (id: string) => {
    deletePack({ id: id })
  }

  const UpDatePack = (id: string) => {
    updatePack({ id: id, name: 'масутра' })
  }

  const onChangeNamePack = (value: string) => {
    setCreatePack(value)
  }
  const cancelAddNewPack = () => {
    setCreatePack('')
    setModalOpen(false)
  }
  const handleOpenCallback = () => {
    setModalOpen(!isModalOpen)
  }

  if (isLoading) {
    return <Typography variant={'h1'}>Loading</Typography>
  }

  if (error) {
    return (
      <>
        <Typography variant={'h1'}>Error</Typography>
        <Typography variant={'h1'}>{JSON.stringify(error)}</Typography>
      </>
    )
  }

  return (
    <Layout isLoginIn>
      <div className={s.container}>
        <div className={s.caption}>
          <Typography variant={'large'}>Packs list</Typography>
          <Modals
            buttonTitle={'Add New Pack'}
            isModalOpen={isModalOpen}
            modalTitle={'Add New Pack'}
            setOpenCallback={handleOpenCallback}
            showCloseButton
          >
            <Input label={'Name Pack'} onValueChange={onChangeNamePack} />
            <div>
              <Checkbox label={'Private pack'} />
            </div>
            <div>
              <Button onClick={cancelAddNewPack} variant={'secondary'}>
                Cancel
              </Button>
              <Button
                disabled={deckCreationStatus.isLoading}
                onClick={onClickCreatePack}
                variant={'primary'}
              >
                Add New Pack
              </Button>
            </div>
          </Modals>
        </div>
        <div className={s.sectionSearch}>
          <Input
            className={s.input}
            onPressEnter={() => {}}
            onValueChange={setInputSearch}
            type={'search'}
            value={name}
          />
          <div>
            <Typography className={s.TabSwitcherTitle} variant={'body2'}>
              Show packs cards
            </Typography>
            <TabSwitcher
              tabs={[
                { title: 'My Cards', value: 'My Cards' },
                { title: 'All Cards', value: 'All Cards' },
              ]}
            />
          </div>
          <Slider
            max={data && data.maxCardsCount}
            propsValue={[minCardsCount, data ? data.maxCardsCount : 100]}
            title={'Number of cards'}
            valueChange={filterCards}
          />
          <Button variant={'secondary'}>
            <>
              <Icon height={'16'} iconId={'delete'} viewBox={'0 0 16 16'} width={'16'} />
              Clear Filter
            </>
          </Button>
        </div>
        <Tables.Root>
          <Tables.Head>
            <Tables.Row>
              <Tables.Cell>Name</Tables.Cell>
              <Tables.Cell>Cards</Tables.Cell>
              <Tables.Cell>Updated</Tables.Cell>
              <Tables.Cell>Author</Tables.Cell>
              <Tables.Cell></Tables.Cell>
            </Tables.Row>
          </Tables.Head>
          <Tables.Body>
            {data?.items?.slice(0, +view).map(deck => {
              return (
                <Tables.Row key={deck?.id}>
                  <Tables.Cell className={s.name} onClick={onClickCards}>
                    {deck?.name}
                    {openCards && <Navigate to={'/cards/' + deck.id} />}
                  </Tables.Cell>
                  <Tables.Cell>{deck?.cardsCount}</Tables.Cell>
                  <Tables.Cell>{new Date(deck?.updated).toLocaleDateString()}</Tables.Cell>
                  <Tables.Cell>{deck?.author.name}</Tables.Cell>
                  <Tables.Cell>
                    <Button
                      className={s.button}
                      disabled={deckDeleteStatus.isLoading}
                      onClick={() => DeletePack(deck.id)}
                      variant={'secondary'}
                    >
                      <Icon height={'16'} iconId={'delete'} viewBox={'0 0 16 16'} width={'16'} />
                    </Button>
                    <Button
                      className={s.button}
                      disabled={deckUpdateStatus.isLoading}
                      onClick={() => UpDatePack(deck.id)}
                      variant={'secondary'}
                    >
                      <Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />
                    </Button>
                  </Tables.Cell>
                </Tables.Row>
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
            {
              title: '1',
              value: '1',
            },
            { title: '2', value: '2' },
            { title: '3', value: '3' },
            { title: '5', value: '5' },
            { title: '10', value: '10' },
          ]}
          pageSize={data?.pagination.itemsPerPage ?? 10}
          totalCount={data?.pagination.totalItems ?? 0}
        />
      </div>
    </Layout>
  )
}

export default Decks
