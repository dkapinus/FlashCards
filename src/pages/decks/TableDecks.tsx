import { ChangeEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ChangeCoverButton } from '@/components/ui/button/changeCoverButton/changeCoverButton'
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
import { useAppDispatch, useAppSelector } from '@/services/Store'
import { useMeQuery } from '@/services/auth/auth.service'
import {
  selectDecksAuthorId,
  selectDecksCurrentPage,
  selectDecksCurrentTab,
  selectDecksMaxCards,
  selectDecksMinCards,
  selectDecksName,
  selectDecksSearch,
} from '@/services/decks_Api/Decks.selectors'
import {
  useCreateDecksMutation,
  useDeleteDecksMutation,
  useGetDecksQuery,
  useUpdateDecksMutation,
} from '@/services/decks_Api/Decks.service'
import { decksSlice } from '@/services/decks_Api/Decks.slice'

import s from './TableDecks.module.scss'

import deckPhoto from '../../assets/images/deckPhoto.svg'

export const TableDecks = () => {
  const dispatch = useAppDispatch()

  const [view, setView] = useState('10')
  const [isPrivatePack, setIsPrivatePack] = useState<boolean>(false)
  const [photo, setPhoto] = useState<File>()

  const nameSearch = useAppSelector(selectDecksSearch)
  const maxCardsCount = useAppSelector(selectDecksMaxCards)
  const minCardsCount = useAppSelector(selectDecksMinCards)
  const currentPage = useAppSelector(selectDecksCurrentPage)
  const authorId = useAppSelector(selectDecksAuthorId)
  const packName = useAppSelector(selectDecksName)
  const tab = useAppSelector(selectDecksCurrentTab)

  const {
    currentData: data,
    error,
    isLoading,
  } = useGetDecksQuery({
    authorId,
    currentPage,
    maxCardsCount,
    minCardsCount,
    name: nameSearch,
  })
  const { data: userData, isError } = useMeQuery()
  const [createDeck, deckCreationStatus] = useCreateDecksMutation()
  const [deleteDeck, deckDeleteStatus] = useDeleteDecksMutation()
  const [updateDeck, deckUpdateStatus] = useUpdateDecksMutation({})

  const isOwner = userData?.id

  const navigate = useNavigate()
  const onClickCards = (deckId: string) => {
    navigate('/pack/' + deckId)
  }

  const onClickLearn = (deckId: string) => {
    navigate('/learnCards/' + deckId)
  }
  const setPage = (currentPage: number) => {
    if (currentPage > 0) {
      dispatch(decksSlice.actions.setCurrentPage(currentPage))
    }
  }

  const setInputSearch = (value: string) => {
    dispatch(decksSlice.actions.setSearch(value))
  }
  const onclickPrivatePack = () => {
    setIsPrivatePack(!isPrivatePack)
  }
  const onClickCreatePack = () => {
    const formData = new FormData()

    if (photo) {
      formData.append('cover', photo)
    }
    if (isPrivatePack) {
      formData.append('isPrivate', String(isPrivatePack))
    }

    formData.append('name', packName)

    createDeck(formData)
    dispatch(decksSlice.actions.setName(''))
    setIsPrivatePack(false)
  }

  const sortByAuthor = (value: string) => {
    if (value === 'My Pack') {
      const authorId = userData?.id || ''

      dispatch(decksSlice.actions.setCurrentTab({ authorId: authorId, tab: 'My Pack' }))
    } else {
      dispatch(decksSlice.actions.setCurrentTab({ authorId: '', tab: 'All Pack' }))
    }
  }

  const filterCards = (e: number[]) => {
    dispatch(decksSlice.actions.setMinCards(e[0]))
    dispatch(decksSlice.actions.setMaxCards(e[1]))
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const onClickResetFilter = () => {
    dispatch(decksSlice.actions.resetFilters())
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const onUploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]

    setPhoto(file)
  }
  const DeleteDeck = (id: string) => {
    deleteDeck({ id: id })
  }

  const UpDateDeck = (id: string, deckName: string) => {
    const formData = new FormData()
    const name = packName === '' ? deckName : packName

    if (photo) {
      formData.append('cover', photo)
    }

    formData.append('isPrivate', String(isPrivatePack))

    formData.append('name', name)

    updateDeck({ body: formData, id: id })

    setIsPrivatePack(false)
  }

  const onChangeNamePack = (value: string) => {
    dispatch(decksSlice.actions.setName(value))
  }
  const cancelDecksModal = () => {
    dispatch(decksSlice.actions.setName(''))
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

  const isLoginIn = !isError

  return (
    <Layout avatar={userData?.avatar || ''} isLoginIn={isLoginIn} name={userData?.name || ''}>
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
            <img alt={''} className={s.createPhoto} src={deckPhoto} />
            <ChangeCoverButton
              inputRef={inputRef}
              onUploadPhoto={onUploadPhoto}
              selectFileHandler={selectFileHandler}
            />

            <div>
              <Input label={'Name Pack'} onValueChange={onChangeNamePack} />
            </div>

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
            value={nameSearch}
          />
          <div>
            <Typography className={s.tabSwitcherTitle} variant={'body2'}>
              Show packs cards
            </Typography>
            <TabSwitcher
              onValueChange={sortByAuthor}
              tabs={[
                { title: 'My Pack', value: 'My Pack' },
                { title: 'All Pack', value: 'All Pack' },
              ]}
              value={tab}
            />
          </div>
          <Slider
            max={data && data.maxCardsCount}
            propsValue={[minCardsCount, data ? data.maxCardsCount : 100]}
            title={'Number of cards'}
            valueChange={filterCards}
          />
          <Button onClick={onClickResetFilter} variant={'secondary'}>
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
                  <Tables.Cell onClick={() => onClickCards(deck.id)}>
                    <div className={s.name}>
                      {deck.cover ? <img alt={''} src={deck?.cover} /> : <img src={deckPhoto} />}
                      <Typography variant={'body1'}> {deck?.name}</Typography>
                    </div>
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
                    {isOwner === deck.userId && (
                      <>
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
                            <Button onClick={cancelDecksModal} variant={'secondary'}>
                              Cancel
                            </Button>,
                            <Button
                              disabled={deckDeleteStatus.isLoading}
                              onClick={() => DeleteDeck(deck.id)}
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
                          <div>
                            Do you really want to remove Pack Name? All cards will be deleted.
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
                            <Button onClick={cancelDecksModal} variant={'secondary'}>
                              Cancel
                            </Button>,
                            <Button
                              disabled={deckUpdateStatus.isLoading}
                              onClick={() => UpDateDeck(deck.id, deck.name)}
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
                          <div>
                            <img className={s.createPhoto} src={deck.cover || deckPhoto} />
                          </div>
                          <ChangeCoverButton
                            inputRef={inputRef}
                            onUploadPhoto={onUploadPhoto}
                            selectFileHandler={selectFileHandler}
                          />
                          <div>
                            <Input
                              defaultValue={deck.name}
                              label={'Name Pack'}
                              onValueChange={onChangeNamePack}
                            />
                          </div>

                          <div>
                            <Checkbox
                              defaultChecked={deck.isPrivate}
                              label={'Private pack'}
                              onCheckedChange={() => setIsPrivatePack(!deck.isPrivate)}
                            />
                          </div>
                        </Modals>
                      </>
                    )}
                  </Tables.Cell>
                </Tables.Row>
              )
            })}
          </Tables.Body>
        </Tables.Root>
        <Pagination
          className={s.pagination}
          currentPage={currentPage}
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

export default TableDecks
