// import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'
import { useAuth } from '../hooks/useAuth'
// import { useAuth } from '../hooks/useAuth'

const Posts = () => {
	const auth = useAuth()
	// const navigate = useNavigate()
	const location = useLocation()

	return (
		<>
			<Container
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingBottom: '2rem',
				}}
			>
				<Typography
					textAlign="justify"
					variant="h3"
					sx={{ display: 'inline-block' }}
				>
					Post Page
				</Typography>
				<Button
					color="success"
					variant="contained"
					size="large"
					sx={{ display: 'inline-block' }}
					component={Link}
					to="/posts/create"
				>
					Add Post
				</Button>
			</Container>

			{/* <Button to="./23" component={Link} variant="contained">
				Link
			</Button> */}
			<Outlet />
		</>
	)
}

export default Posts
