import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
// import { ProtectedRoute } from './components/ProtectedRoute'
import { Loader } from './components/Loader'
// import PostList from './components/PostList'
// import Post from './components/Post'

import { $api } from './http'

const HomePage = lazy(() => import('./pages/home-page'))
const LoginForm = lazy(() => import('./components/LoginForm'))
const RegistrationForm = lazy(() => import('./components/RegistrationForm'))
const ProductPage = lazy(() => import('./pages/product-page'))
const PricePage = lazy(() => import('./pages/price-page'))
const OptionPage = lazy(() => import('./pages/option-page'))
const Post = lazy(() => import('./components/Post'))
const PostPage = lazy(() => import('./pages/post-page'))
const PostList = lazy(() => import('./components/PostList'))
const ErrorPage = lazy(() => import('./pages/error-page'))
const Profile = lazy(() => import('./components/Profile'))
const Account = lazy(() => import('./components/Account'))

const getPosts = async () => {
	return await $api.get('/posts')
}

const getPost = async (id: string) => {
	return await $api.get(`/posts/${id}`)
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'products',
				element: (
					<Suspense fallback={<Loader />}>
						<ProductPage />
					</Suspense>
				),
			},
			{
				path: 'pricing',
				element: (
					<Suspense fallback={<Loader />}>
						<PricePage />
					</Suspense>
				),
			},
			{
				path: 'posts',
				element: (
					// <ProtectedRoute allowedRole="USER">
					<Suspense fallback={<Loader />}>
						<PostPage />
					</Suspense>
					// </ProtectedRoute>
				),
				children: [
					{
						index: true,
						loader: () => getPosts(),
						element: (
							<Suspense fallback={<Loader />}>
								<PostList />
							</Suspense>
						),
					},
					{
						path: ':id',
						loader: ({ params }) => getPost(params.id!.toString()),
						element: (
							<Suspense fallback={<Loader />}>
								<Post />
							</Suspense>
						),
					},
				],
			},
			{
				path: 'options',
				element: (
					<Suspense fallback={<Loader />}>
						<OptionPage />
					</Suspense>
				),
			},
			{
				path: 'registration',
				element: (
					<Suspense fallback={<Loader />}>
						<RegistrationForm />
					</Suspense>
				),
			},
			{
				path: 'login',
				element: (
					<Suspense fallback={<Loader />}>
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
