import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { IPost } from '../../models/IPost'

const PostItem = ({ id, title, body, createdAt, author }: IPost) => {
	const arr = body.split(' ')

	const resume =
		arr.length > 20 ? arr.slice(0, 20).join(' ') + '...' : arr.join(' ')

	return (
		<Card sx={{ minWidth: 275, marginTop: '.5rem' }}>
			<CardContent sx={{ justifyContent: 'space-between' }}>
				<Typography variant="h4" component="h2" gutterBottom>
					{title}
				</Typography>
				<Container
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						marginBottom: { xs: '.5rem', md: '1rem' },
					}}
				>
					<Typography variant="caption" component="span">
						<Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
							Author:
						</Box>
						<i>
							<strong> {author.name}</strong>
						</i>
					</Typography>
					<Typography variant="caption" component="span">
						<Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
							posted at:
						</Box>
						<strong> {createdAt.toLocaleDateString()}</strong>
					</Typography>
				</Container>
				<Typography variant="body1">{resume}</Typography>
			</CardContent>
			<CardActions>
				<Button to={`/posts/${id}`} size="small" component={Link}>
					Read More
				</Button>
			</CardActions>
		</Card>
	)
}

export default PostItem
