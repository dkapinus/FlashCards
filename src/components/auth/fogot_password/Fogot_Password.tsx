import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'

import s from '@/components/auth/fogot_password/Fogot_Password.module.scss'

export const Fogot_password = () => {
  const onclickInstructionsHandler = () => {
    console.log('Send Instructions to email: example.email')
  }
  const onclickTryLoginHandler = () => {
    console.log('Redirect to <Login/>')
  }

  return (
    <Card style={{ height: '456px' }}>
      <Typography variant={'large'}>{'Forgot your password?'}</Typography>
      <div className={s.inputAndInstruction}>
        <Input className={s.input} label={'Email'} />
        <Typography variant={'body2'}>
          {'Enter your email address and we will send you further instructions'}
        </Typography>
      </div>
      <div className={s.buttonAndLink}>
        <Button onClick={onclickInstructionsHandler} variant={'primary'}>
          {'Send Instructions'}
        </Button>
        <Typography className={s.rememberPassword} variant={'body2'}>
          {'Did you remember your password?'}
        </Typography>
        <Button fullWidth onClick={onclickTryLoginHandler} variant={'link'}>
          {'Try logging in'}
        </Button>
      </div>
    </Card>
  )
}
