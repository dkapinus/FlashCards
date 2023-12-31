import { useForm } from 'react-hook-form'

import { Controlled_Input } from '@/components/controlled/controlled_input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Layout } from '@/components/ui/layout/Layout'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/components/auth/forgot_password/Forgot_Password.module.scss'

type ForgotPasswordType = {
  onSubmit: (data: FormValues) => void
}

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof ForgotPasswordSchema>
export const Forgot_password = ({ onSubmit }: ForgotPasswordType) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotPasswordSchema),
  })
  const onclickTryLoginHandler = () => {
    console.log('Redirect to <SignIn/>')
  }

  return (
    <>
      <DevTool control={control} />
      <Layout isLoginIn>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className={s.container}>
            <Typography variant={'large'}>{'Forgot your password?'}</Typography>
            <div className={s.inputAndInstruction}>
              <Controlled_Input
                className={s.input}
                control={control}
                errorMessage={errors.email?.message}
                label={'Email'}
                name={'email'}
                type={'email'}
              />
              <Typography className={s.rememberPassword} variant={'body2'}>
                {'Enter your email address and we will send you further instructions'}
              </Typography>
            </div>
            <div className={s.buttonAndLink}>
              <Button fullWidth variant={'primary'}>
                {'Send Instructions'}
              </Button>
              <Typography className={s.rememberPassword} variant={'body2'}>
                {'Did you remember your password?'}
              </Typography>
              <Button as={'a'} onClick={onclickTryLoginHandler} variant={'link'}>
                {'Try logging in'}
              </Button>
            </div>
          </Card>
        </form>
      </Layout>
    </>
  )
}
