import { useState, FormEvent } from 'react'
import {
	Card,
	CardActions,
	CardContent,
	Container,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'
import {
	CheckCircle as CheckCircleIcon,
	Reply as ReplyIcon,
	Cancel as CancelIcon,
} from '@mui/icons-material'
import { useLoaderData, Navigate, Link } from 'react-router-dom'
import { IPost } from '../../models/IPost'

const PostEdit = () => {
	const response = useLoaderData() as { data: IPost }

	const [newTitle, setNewTitle] = useState<string>(response.data.title)
	const [titleError, setTitleError] = useState<string>(' ')
	const [newBody, setNewBody] = useState<string>(response.data.body)
	const [bodyError, setBodyError] = useState<string>(' ')
	const [isEdited, setIsEdited] = useState<boolean>(false)

	const handleSubmitForm = (event: FormEvent<HTMLElement>) => {
		event.preventDefault()
		if (newTitle.length < 3) setTitleError('Title must be at least 3 chars')
		if (newBody.length < 10) setBodyError('Title must be at least 10 chars')
		// Save the changes
	}

	const handleOnFocus = () => {
		setIsEdited(true)
		setTitleError(' ')
		setBodyError(' ')
	}

	const handleCancelChanges = () => {}

	if (!response.data) return <Navigate to="/" />

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: { xs: '100%', md: '75%' },
				paddingTop: { xs: '2rem', md: '1rem' },
			}}
		>
			<Card component="form" onSubmit={e => handleSubmitForm(e)}>
				<Typography
					variant="h5"
					sx={{ textAlign: 'right', marginTop: '1rem', marginRight: '1rem' }}
				>
					Edit Post
				</Typography>
				<CardContent sx={{ justifyContent: 'space-between' }}>
					<TextField
						onChange={e => setNewTitle(e.target.value)}
						onFocus={handleOnFocus}
						value={newTitle}
						margin="normal"
						fullWidth
						label="Post Title"
						name="title"
						type="text"
						placeholder="Post Title"
						inputProps={
							isEdited
								? { style: { color: 'black' } }
								: { style: { color: 'lightgray' } }
						}
						error={titleError !== ' '}
						helperText={titleError}
					/>

					<TextField
						onChange={e => setNewBody(e.target.value)}
						onFocus={handleOnFocus}
						value={newBody}
						margin="normal"
						multiline
						fullWidth
						label="Post Body"
						name="body"
						type="text"
						placeholder="Post Body"
						inputProps={
							isEdited
								? { style: { color: 'black' } }
								: { style: { color: 'lightgray' } }
						}
						error={bodyError !== ' '}
						helperText={bodyError}
					/>
				</CardContent>
				<CardActions sx={{ justifyContent: 'space-between' }}>
					<IconButton
						to={`/posts/${response.data.id}`}
						size="large"
						component={Link}
					>
						<ReplyIcon color="info" fontSize="inherit" />
					</IconButton>
					<Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<IconButton type="submit" size="large" disabled={!isEdited}>
							<CheckCircleIcon
								color={isEdited ? 'success' : 'disabled'}
								fontSize="inherit"
							/>
						</IconButton>
						<IconButton
							onClick={handleCancelChanges}
							size="large"
							disabled={!isEdited}
						>
							<CancelIcon
								color={isEdited ? 'error' : 'disabled'}
								fontSize="inherit"
							/>
						</IconButton>
					</Container>
				</CardActions>
			</Card>
		</Container>
	)
}

export default PostEdit
