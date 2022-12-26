import {
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Typography,
} from '@mui/material'
import { useLoaderData, useLocation, Navigate, Link } from 'react-router-dom'

const PostEdit = () => {
	const response = useLoaderData() as { data: { body: string; title: string } }
	const { pathname } = useLocation()

	let backUrl: string
	try {
		const idx = pathname.lastIndexOf('/edit')
		backUrl = pathname.slice(0, idx)
	} catch {
		backUrl = '/'
	}

	const handleSaveChanges = () => {}

	if (response.data) {
		return (
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: { xs: '100%', md: '75%' },
				}}
			>
				<h2>Post Edit</h2>
				<Card>
					<CardContent>
						<Typography variant="h5" component="h2" gutterBottom>
							{response.data.title}
						</Typography>
						<Typography variant="body1">{response.data.body}</Typography>
					</CardContent>
					<CardActions>
						<Button to={backUrl} size="small" component={Link}>
							Cancel
						</Button>
						<Button onClick={handleSaveChanges} size="small">
							Save Changes
						</Button>
					</CardActions>
				</Card>
			</Container>
		)
	}
	return <Navigate to="/" />
}

export default PostEdit
