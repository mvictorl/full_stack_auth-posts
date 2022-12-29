import {
	Box,
	Button,
	IconButton,
	Card,
	CardActions,
	CardContent,
	Container,
	Typography,
	Tooltip,
} from '@mui/material'
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Reply as ReplyIcon,
} from '@mui/icons-material'
import { useLoaderData, useLocation, Navigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { IPost } from '../../models/IPost'

const Post = () => {
	const response = useLoaderData() as { data: IPost }
	const { isAuth, user } = useAuth()
	const { pathname } = useLocation()
	const createDate = new Date(response.data.createdAt)

	if (!response.data) return <Navigate to="/" />

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: { xs: '100%', md: '75%' },
			}}
		>
			<Card>
				<CardContent sx={{ justifyContent: 'space-between' }}>
					<Typography variant="h4" component="h2" gutterBottom>
						{response.data.title}
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
								<strong> {response.data.author.name}</strong>
							</i>
						</Typography>
						<Typography variant="caption" component="span">
							<Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
								posted at:
							</Box>
							<strong> {createDate.toLocaleString()}</strong>
						</Typography>
					</Container>
					<Typography variant="body1">{response.data.body}</Typography>
				</CardContent>

				<CardActions
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Tooltip title="Back">
						<IconButton to="/posts" size="large" component={Link}>
							<ReplyIcon color="info" fontSize="inherit" />
						</IconButton>
					</Tooltip>

					{isAuth && response.data.author.id === user.id ? (
						<Container
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-end',
							}}
						>
							<Tooltip title="Edit">
								<IconButton
									to={`${pathname}/edit`}
									color="info"
									component={Link}
								>
									<EditIcon />
								</IconButton>
							</Tooltip>

							<Tooltip title="Delete">
								<IconButton
									to={`${pathname}/delete`}
									color="error"
									sx={{ marginLeft: '.5rem' }}
									component={Link}
								>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						</Container>
					) : null}
				</CardActions>
			</Card>
		</Container>
	)
}

export default Post
