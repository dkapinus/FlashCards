import { useForm } from 'react-hook-form'

import { Controlled_Checkbox } from '@/components/controlled/controlled_checkbox/Controlled_Checkbox'
import { Controlled_Input } from '@/components/controlled/controlled_input/Controlled_Input'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '../../ui/button'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>
export const Login_form = () => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Controlled_Input
        control={control}
        errorMessage={errors.email?.message}
        label={'email'}
        name={'email'}
        type={'email'}
      />
      <Controlled_Input
        control={control}
        errorMessage={errors.password?.message}
        label={'password'}
        name={'password'}
        type={'password'}
      />
      <Controlled_Checkbox control={control} label={'remember me'} name={'rememberMe'} />
      <Button type={'submit'} variant={'primary'}>
        Submit
      </Button>
    </form>
  )
}
