import { useLoaderData, Navigate } from 'react-router-dom'

const Post = () => {
	const response = useLoaderData() as { data: { body: string; title: string } }

	if (response.data) {
		return (
			<>
				<h1>{response.data.title}</h1>
				<h3>{response.data.body}</h3>
			</>
		)
	}
	return <Navigate to="/" />
}

export default Post
