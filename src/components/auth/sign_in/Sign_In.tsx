import { useForm } from 'react-hook-form'

import { Controlled_Checkbox } from '@/components/controlled/controlled_checkbox'
import { Controlled_Input } from '@/components/controlled/controlled_input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './Sign_In.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>
export const SignIn = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <>
      <DevTool control={control} />
      <Header isLoginIn={false} name={'user'} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={s.container}>
          <Typography as={'h2'} variant={'large'}>
            Sign In
          </Typography>
          <Controlled_Input
            className={s.input}
            control={control}
            errorMessage={errors.email?.message}
            label={'Email'}
            name={'email'}
            type={'email'}
          />
          <Controlled_Input
            className={s.input}
            control={control}
            errorMessage={errors.password?.message}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <Controlled_Checkbox
            className={s.checkbox}
            control={control}
            label={'remember me'}
            name={'rememberMe'}
          />
          <Typography as={'a'} className={s.forgot} variant={'body2'}>
            Forgot Password?
          </Typography>
          <Button className={s.signInBtn} fullWidth type={'submit'} variant={'primary'}>
            <Typography variant={'subtitle2'}>Sign In</Typography>
          </Button>
          <Typography as={'a'} className={s.linkAccount} variant={'body2'}>
            Don't have an account?
          </Typography>
          <Button variant={'link'}>Sign Up</Button>
        </Card>
      </form>
    </>
  )
}
