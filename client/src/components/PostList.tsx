import { useLoaderData } from 'react-router-dom'
import PostItem from './PostItem'
import { Container } from '@mui/material'

const PostList = () => {
	const data = useLoaderData() as { data: [] }

	return (
		<Container sx={{ width: { xs: '100%', md: '75%' } }}>
			{data.data.map((p: any) => (
				<PostItem key={p.id} id={p.id} title={p.title} body={p.body} />
			))}
		</Container>
	)
}

export default PostList
