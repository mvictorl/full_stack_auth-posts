import { useLoaderData } from 'react-router-dom'
import PostItem from './PostItem'

const PostList = () => {
	const data = useLoaderData() as { data: [] }

	const out = data.data.map((p: any) => (
		<PostItem key={p.id} id={p.id} title={p.title} body={p.body} />
	))

	return <>{out}</>
}

export default PostList
