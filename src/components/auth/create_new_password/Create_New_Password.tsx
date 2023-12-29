import { useForm } from 'react-hook-form'

import { Controlled_Input } from '@/components/controlled/controlled_input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Layout } from '@/components/ui/layout/Layout'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/components/auth/create_new_password/Create_New_Password.module.scss'

type CreateNewPasswordType = {
  onSubmit: (data: FormValues) => void
}

const CreateNewPasswordSchema = z.object({
  password: z.string().min(3),
})

type FormValues = z.infer<typeof CreateNewPasswordSchema>
export const Create_New_Password = ({ onSubmit }: CreateNewPasswordType) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(CreateNewPasswordSchema),
  })

  return (
    <>
      <DevTool control={control} />
      <Layout isLoginIn>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className={s.container}>
            <Typography variant={'large'}>{'Create new password'}</Typography>
            <div className={s.inputAndInstruction}>
              <Controlled_Input
                className={s.input}
                control={control}
                errorMessage={errors.password?.message}
                label={'Password'}
                name={'password'}
                type={'password'}
              />
              <Typography className={s.createPasswordDescription} variant={'body2'}>
                {'Create new password and we will send you further instructions to email'}
              </Typography>
            </div>
            <Button className={s.createPasswordButton} fullWidth variant={'primary'}>
              {'Create New Password'}
            </Button>
          </Card>
        </form>
      </Layout>
    </>
  )
}
