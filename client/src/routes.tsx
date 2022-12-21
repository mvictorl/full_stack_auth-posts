import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { ProtectedRoute } from './components/ProtectedRoute'
// import PostList from './components/PostList'
// import Post from './components/Post'

const Home = lazy(() => import('./pages/home'))
const LoginForm = lazy(() => import('./components/LoginForm'))
const RegistrationForm = lazy(() => import('./components/RegistrationForm'))
const Products = lazy(() => import('./pages/products'))
const Pricing = lazy(() => import('./pages/pricing'))
const Post = lazy(() => import('./components/Post'))
const Posts = lazy(() => import('./pages/posts'))
const PostList = lazy(() => import('./components/PostList'))
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
				index: true,
				element: <Home />,
			},
			{
				path: 'products',
				element: (
					<Suspense fallback={<h3>Loading...</h3>}>
						<Products />
					</Suspense>
				),
			},
			{
				path: 'pricing',
				element: (
					<Suspense fallback={<h3>Loading...</h3>}>
						<Pricing />
					</Suspense>
				),
			},
			{
				path: 'posts',
				element: (
					<ProtectedRoute allowedRole="USER">
						<Suspense fallback={<h3>Loading...</h3>}>
							<Posts />
						</Suspense>
					</ProtectedRoute>
				),
				children: [
					{
						path: '',
						element: (
							<Suspense fallback={<h3>Loading...</h3>}>
								<PostList />
							</Suspense>
						),
					},
					{
						path: ':id',
						element: (
							<Suspense fallback={<h3>Loading...</h3>}>
								<Post />
							</Suspense>
						),
					},
				],
			},
			{
				path: 'registration',
				element: (
					<Suspense fallback={<h3>Loading...</h3>}>
						<RegistrationForm />
					</Suspense>
				),
			},
			{
				path: 'login',
				element: (
					<Suspense fallback={<h3>Loading...</h3>}>
						<LoginForm />
					</Suspense>
				),
			},
			{
				path: 'profile',
				element: <Profile />,
			},
			{
				path: 'account',
				element: <Account />,
			},
		],
	},
])
