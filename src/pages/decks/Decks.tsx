import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
} from '@/services/decks_Api/Decks.service'

import s from './Decks.module.scss'

export const Decks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [view, setView] = useState('10')
  const [name, setInputValue] = useState('')
  const [packName, setPackName] = useState('')
  const [isPrivatePack, setIsPrivatePack] = useState<boolean>(false)
  const [minCardsCount, setMinCardsCount] = useState<number>(0)
  const [maxCardsCount, setMaxCardsCount] = useState<number>(0)
  const [authorId, setAuthorId] = useState('')

  const navigate = useNavigate()
  const onClickCards = (deckId: string) => {
    navigate('/cards/' + deckId)
  }

  const onClickLearn = (deckId: string) => {
    navigate('/learnCards/' + deckId)
  }
  const setPage = (currentPage: number) => {
    if (currentPage > 0) {
      setCurrentPage(currentPage)
    }
  }

  const setInputSearch = (value: string) => {
    setInputValue(value)
  }
  const onclickPrivatePack = () => {
    setIsPrivatePack(!isPrivatePack)
  }
  const onClickCreatePack = () => {
    createDeck({ isPrivate: isPrivatePack, name: packName })
    setPackName('')
    setIsPrivatePack(false)
  }

  const { data, error, isLoading } = useGetDecksQuery({
    authorId: authorId,
    currentPage,
    maxCardsCount,
    minCardsCount,
    name,
  })
  const [createDeck, deckCreationStatus] = useCreateDecksMutation()
  const [deletePack, deckDeleteStatus] = useDeleteDecksMutation()
  const [updatePack, deckUpdateStatus] = useUpdateDecksMutation({})

  const onFilterMyCard = () => {
    setAuthorId('f2be95b9-4d07-4751-a775-bd612fc9553a')
  }

  const filterCards = (e: number[]) => {
    setMinCardsCount(e[0])
    setMaxCardsCount(e[1])
  }
  const DeletePack = (id: string) => {
    deletePack({ id: id })
  }

  const UpDatePack = (id: string, deckName: string) => {
    updatePack({ id: id, isPrivate: isPrivatePack, name: packName === '' ? deckName : packName })
    setIsPrivatePack(false)
  }

  const onChangeNamePack = (value: string) => {
    setPackName(value)
  }
  const cancelDecksModal = () => {
    setPackName('')
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
            buttonsInFooter={[
              <Button onClick={cancelDecksModal} variant={'secondary'}>
                Cancel
              </Button>,
              <Button
                disabled={deckCreationStatus.isLoading}
                onClick={onClickCreatePack}
                variant={'primary'}
              >
                Add New Pack
              </Button>,
            ]}
            modalTitle={'Add New Pack'}
            showCloseButton
          >
            <Input label={'Name Pack'} onValueChange={onChangeNamePack} />
            <div>
              <Checkbox label={'Private pack'} onClick={onclickPrivatePack} />
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
              onClick={onFilterMyCard}
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
                  <Tables.Cell className={s.name} onClick={() => onClickCards(deck.id)}>
                    {deck?.name}
                  </Tables.Cell>
                  <Tables.Cell>{deck?.cardsCount}</Tables.Cell>
                  <Tables.Cell>{new Date(deck?.updated).toLocaleDateString()}</Tables.Cell>
                  <Tables.Cell>{deck?.author.name}</Tables.Cell>
                  <Tables.Cell>
                    <Button
                      className={s.button}
                      onClick={() => onClickLearn(deck.id)}
                      variant={'secondary'}
                    >
                      <Icon height={'16'} iconId={'learn'} viewBox={'0 0 16 16'} width={'16'} />
                    </Button>
                    <Modals
                      buttonIcon={
                        <Icon height={'16'} iconId={'delete'} viewBox={'0 0 16 16'} width={'16'} />
                      }
                      buttonsInFooter={[
                        <Button onClick={cancelDecksModal} variant={'secondary'}>
                          Cancel
                        </Button>,
                        <Button
                          disabled={deckDeleteStatus.isLoading}
                          onClick={() => DeletePack(deck.id)}
                          variant={'primary'}
                        >
                          Delete Pack
                        </Button>,
                      ]}
                      className={s.button}
                      disabled={deckDeleteStatus.isLoading}
                      modalTitle={'Delete Pack'}
                      showCloseButton
                      variant={'secondary'}
                    >
                      <div>Do you really want to remove Pack Name? All cards will be deleted.</div>
                    </Modals>
                    <Modals
                      buttonIcon={
                        <Icon height={'16'} iconId={'edit'} viewBox={'0 0 16 16'} width={'16'} />
                      }
                      buttonsInFooter={[
                        <Button onClick={cancelDecksModal} variant={'secondary'}>
                          Cancel
                        </Button>,
                        <Button
                          disabled={deckUpdateStatus.isLoading}
                          onClick={() => UpDatePack(deck.id, deck.name)}
                          variant={'primary'}
                        >
                          Save Changes
                        </Button>,
                      ]}
                      className={s.button}
                      disabled={deckUpdateStatus.isLoading}
                      modalTitle={'Edit Pack'}
                      showCloseButton
                      variant={'secondary'}
                    >
                      <Input
                        defaultValue={deck.name}
                        label={'Name Pack'}
                        onValueChange={onChangeNamePack}
                      />
                      <div>
                        <Checkbox
                          defaultChecked={deck.isPrivate}
                          label={'Private pack'}
                          onCheckedChange={() => setIsPrivatePack(!deck.isPrivate)}
                        />
                      </div>
                    </Modals>
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
            { title: '1', value: '1' },
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
