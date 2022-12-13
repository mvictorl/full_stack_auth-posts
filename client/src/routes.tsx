import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'

// import { Posts, ErrorPage } from './pages'
// import LoginForm from './components/LoginForm'
// import RegistrationForm from './components/RegistrationForm'
// import Profile from './components/Profile'
// import Account from './components/Account'
// import Products from './pages/products'
// import Pricing from './pages/pricing'

const Home = lazy(() => import('./pages/home'))
const LoginForm = lazy(() => import('./components/LoginForm'))
const RegistrationForm = lazy(() => import('./components/RegistrationForm'))
const Products = lazy(() => import('./pages/products'))
const Pricing = lazy(() => import('./pages/pricing'))
const Posts = lazy(() => import('./pages/posts'))
const ErrorPage = lazy(() => import('./pages/error-page'))
const Profile = lazy(() => import('./components/Profile'))
const Account = lazy(() => import('./components/Account'))

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'home',
				element: <Home />,
			},
			{
				path: 'products',
				element: <Products />,
			},
			{
				path: 'pricing',
				element: <Pricing />,
			},
			{
				path: 'registration',
				element: <RegistrationForm />,
			},
			{
				path: 'login',
				element: <LoginForm />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
			{
				path: 'account',
				element: <Account />,
			},
			{
				path: 'posts',
				element: <Posts />,
			},
		],
	},
])
