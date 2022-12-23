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
			<Container>
				<Typography textAlign="justify" variant="h3">
					Post Page
				</Typography>
			</Container>

			{/* <Button to="./23" component={Link} variant="contained">
				Link
			</Button> */}
			<Outlet />
		</>
	)
}

export default Posts
