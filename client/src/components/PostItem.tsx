import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

type Props = {
	id: string
	title: string
	body: string
}

const PostItem = ({ id, title, body }: Props) => {
	const arr = body.split(' ')
	const resume =
		arr.length > 20 ? arr.slice(0, 20).join(' ') + '...' : arr.join(' ')

	return (
		<Card sx={{ minWidth: 275, marginTop: '.5rem' }}>
			<CardContent>
				<Typography variant="h5" component="h2" gutterBottom>
					{title}
				</Typography>
				<Typography variant="body1">{resume}</Typography>
			</CardContent>
			<CardActions>
				<Button to={`/posts/${id}`} size="small" component={Link}>
					Learn More
				</Button>
			</CardActions>
		</Card>
	)
}

export default PostItem
