import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/ui/header'
import { Icon } from '@/components/ui/icon/Icon'
import { Typography } from '@/components/ui/typography'

import s from '@/components/auth/check_email/Check_email.module.scss'

type CheckEmailType = {
  email: string
}
export const Check_email = ({ email }: CheckEmailType) => {
  const onclickBackToSignInHandler = () => {
    console.log('Redirect to <SignIn/>')
  }

  return (
    <>
      <Header isLoginIn={false} name={'user'} />
      <Card className={s.container}>
        <Typography className={s.title} variant={'large'}>
          {'Check Email'}
        </Typography>
        <Icon height={'96'} iconId={'email'} viewBox={'0 0 96 96'} width={'96'} />
        <Typography className={s.emailInstructions} variant={'body2'}>
          {`We’ve sent an Email with instructions to`}
          <br />
          {email}
        </Typography>
        <Button fullWidth onClick={onclickBackToSignInHandler} variant={'primary'}>
          {'Back to Sign In'}
        </Button>
      </Card>
    </>
  )
}
