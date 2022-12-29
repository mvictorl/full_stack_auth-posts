import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Loader } from './components/Loader'

import { $api } from './http'
import PostCreate from './components/Post/PostCreate'

const HomePage = lazy(() => import('./pages/home-page'))
const LoginForm = lazy(() => import('./components/LoginForm'))
const RegistrationForm = lazy(() => import('./components/RegistrationForm'))
const ActivatePage = lazy(() => import('./pages/activate-page'))
const ProductPage = lazy(() => import('./pages/product-page'))
const PricePage = lazy(() => import('./pages/price-page'))
const OptionPage = lazy(() => import('./pages/option-page'))
const Post = lazy(() => import('./components/Post/Post'))
const PostPage = lazy(() => import('./pages/post-page'))
const PostList = lazy(() => import('./components/Post/PostList'))
const PostEdit = lazy(() => import('./components/Post/PostEdit'))
const ErrorPage = lazy(() => import('./pages/error-page'))
const Profile = lazy(() => import('./pages/profile-page'))
const Account = lazy(() => import('./pages/account-page'))

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
					<Suspense fallback={<Loader />}>
						<PostPage />
					</Suspense>
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
					{
						path: ':id/edit',
						loader: ({ params }) => getPost(params.id!.toString()),
						element: (
							<Suspense fallback={<Loader />}>
								<ProtectedRoute allowedRole="USER">
									<PostEdit />
								</ProtectedRoute>
							</Suspense>
						),
					},
					{
						path: 'create',
						element: (
							<ProtectedRoute allowedRole="USER">
								<PostCreate />
							</ProtectedRoute>
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
				path: 'activate',
				element: (
					<Suspense fallback={<Loader />}>
						<ActivatePage />
					</Suspense>
				),
			},
			{
				path: 'profile',
				element: (
					<Suspense fallback={<Loader />}>
						<ProtectedRoute allowedRole="USER">
							<Profile />
						</ProtectedRoute>
					</Suspense>
				),
			},
			{
				path: 'account',
				element: (
					<Suspense fallback={<Loader />}>
						<ProtectedRoute allowedRole="USER">
							<Account />
						</ProtectedRoute>
					</Suspense>
				),
			},
		],
	},
])
