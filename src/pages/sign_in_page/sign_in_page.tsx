import { useNavigate } from 'react-router-dom'

import { SignIn } from '@/components/auth/sign_in/Sign_In'
import { useLoginMutation } from '@/services/auth/auth.service'
import { LoginArgs } from '@/services/auth/auth.types'

export const SignInPage = () => {
  const [signIn] = useLoginMutation()
  const navigate = useNavigate()
  const handleSignIn = async (data: LoginArgs) => {
    try {
      await signIn(data).unwrap()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return <SignIn onSubmit={handleSignIn} />
}
