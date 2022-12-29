import { useLoaderData } from 'react-router-dom'
import { Container } from '@mui/material'
import { IPost } from '../../models/IPost'
import PostItem from './PostItem'

const PostList = () => {
	const data = useLoaderData() as { data: IPost[] }

	return (
		<Container sx={{ width: { xs: '100%', md: '75%' } }}>
			{data.data.map((p: any) => (
				<PostItem
					key={p.id}
					id={p.id}
					title={p.title}
					body={p.body}
					createdAt={new Date(p.createdAt)}
					author={p.author}
				/>
			))}
		</Container>
	)
}

export default PostList
