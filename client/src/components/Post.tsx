import {
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Typography,
} from '@mui/material'
import { useLoaderData, useLocation, Navigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { IUser } from '../models/IUser'

const Post = () => {
	const response = useLoaderData() as {
		data: { title: string; body: string; author: IUser }
	}
	const { isAuth, user } = useAuth()
	const { pathname } = useLocation()

	if (response.data) {
		const btns =
			isAuth && response.data.author.id === user.id ? (
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}
				>
					<Button
						to={`${pathname}/edit`}
						size="small"
						variant="contained"
						color="info"
						component={Link}
					>
						Edit
					</Button>
					<Button
						to={`${pathname}/delete`}
						variant="contained"
						color="error"
						size="small"
						sx={{ marginLeft: '.3rem' }}
						component={Link}
					>
						Delete
					</Button>
				</Container>
			) : null

		return (
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: { xs: '100%', md: '75%' },
				}}
			>
				<Card>
					<CardContent>
						<Typography variant="h5" component="h2" gutterBottom>
							{response.data.title}
						</Typography>
						<Typography variant="body1">{response.data.body}</Typography>
					</CardContent>
					<CardActions
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Button to="/posts" size="small" component={Link}>
							Back
						</Button>
						{btns}
					</CardActions>
				</Card>
			</Container>
		)
	}
	return <Navigate to="/" />
}

export default Post
