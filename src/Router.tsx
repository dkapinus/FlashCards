import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { EditProfile } from '@/components/auth/edit_profile'
import TableDecks from '@/pages/decks/TableDecks'
import LearnCards from '@/pages/learnCards/LearnCards'
import Pack from '@/pages/pack/Pack'
import { Page_404 } from '@/pages/page_404/Page_404'
import { SignInPage } from '@/pages/sign_in_page'
import { SignUpPage } from '@/pages/sign_up_page'
import { useMeQuery } from '@/services/auth/auth.service'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
  {
    element: <SignUpPage />,
    path: '/sign-up',
  },
  {
    element: <Page_404 />,
    path: '/*',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <TableDecks />,
    path: '/',
  },
  {
    element: <Pack />,
    path: '/pack/:id',
  },
  {
    element: <LearnCards />,
    path: '/learnCards/:id',
  },
  {
    element: <EditProfile />,
    path: '/profile',
  },
]

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()

  if (isLoading) {
    return <div> Loading...</div>
  }
  const isAuthenticated = !isError

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  const { isLoading } = useMeQuery()

  if (isLoading) {
    return <div> Loading...</div>
  }

  return <RouterProvider router={router} />
}
