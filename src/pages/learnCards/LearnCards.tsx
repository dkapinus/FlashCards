import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon/Icon'
import { Layout } from '@/components/ui/layout/Layout'
import { RadioGroup } from '@/components/ui/radioGroup'
import { Typography } from '@/components/ui/typography'
import { useGetDecksByIdQuery } from '@/services/decks_Api/Decks.service'
import { useGetLearnCardsQuery } from '@/services/learn_Api/LearnCards.service'

import s from './Learn.module.scss'

const LearnCards = () => {
  const [openAnswer, setOpenAnswer] = useState(false)

  const params = useParams()

  const userId = params.id

  const { data } = useGetLearnCardsQuery({ id: userId })

  const { data: deck } = useGetDecksByIdQuery({ id: userId })

  const nameDeck = deck?.name

  const isEmpty = data === undefined

  const onClickAnswer = () => {
    setOpenAnswer(true)
  }

  const onClickNext = () => {
    setOpenAnswer(false)
  }

  return (
    <>
      <Layout isLoginIn>
        <Button as={'a'} className={s.button_link} href={'/'} variant={'link'}>
          <Icon height={'24'} iconId={'arrow-back'} viewBox={'0 0 24 24'} width={'24'} />
          Back to Packs List
        </Button>
        {isEmpty ? (
          <Typography className={s.infoText} variant={'body2'}>
            This not card for learn.
          </Typography>
        ) : (
          <Card className={s.container}>
            <Typography className={s.name} variant={'large'}>
              Learn "{nameDeck}"
            </Typography>
            <Typography className={s.question} variant={'subtitle1'}>
              Question: {data?.question}
            </Typography>
            <Typography className={s.conditions} variant={'body2'}>
              Количество попыток ответов на вопрос: 10
            </Typography>
            {data?.questionImg && <img className={s.img} src={data?.questionImg} />}

            {openAnswer ? (
              <>
                <Typography className={s.answer} variant={'subtitle1'}>
                  Answer:{' '}
                  <Typography as={'span'} variant={'body1'}>
                    {data?.answer}
                  </Typography>
                </Typography>
                {data?.answerImg && <img className={s.img} src={data?.answerImg} />}
                <Typography variant={'subtitle1'}>Rate yourself:</Typography>
                <RadioGroup
                  className={s.radioGroup}
                  onChange={() => ''}
                  options={[
                    { id: 0, title: 'Did not know', value: '1' },
                    { id: 0, title: 'Forgot', value: '2' },
                    { id: 0, title: 'A lot of thought', value: '3' },
                    { id: 0, title: 'Confused', value: '4' },
                    { id: 0, title: 'Knew the answer', value: '5' },
                  ]}
                />

                <Button fullWidth onClick={onClickNext} variant={'primary'}>
                  Next Question
                </Button>
              </>
            ) : (
              <Button fullWidth onClick={onClickAnswer} variant={'primary'}>
                <Typography variant={'subtitle2'}>Show Answer</Typography>
              </Button>
            )}
          </Card>
        )}
      </Layout>
    </>
  )
}

export default LearnCards
