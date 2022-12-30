import { Link, useLoaderData } from 'react-router-dom'
import { Box, Button, Container } from '@mui/material'
import { IPost } from '../../models/IPost'
import PostItem from './PostItem'

const PostList = () => {
	const data = useLoaderData() as { data: IPost[] }

	return (
		<Container sx={{ width: { xs: '100%', md: '75%' } }}>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					color="success"
					variant="contained"
					size="large"
					component={Link}
					to="/posts/create"
				>
					Add Post
				</Button>
			</Box>

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
