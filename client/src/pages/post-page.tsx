// import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { useAuth } from '../hooks/useAuth'

const Posts = () => {
	const auth = useAuth()
	const location = useLocation()

	return (
		<>
			<Container>
				<Typography variant="h3">Post Page</Typography>
			</Container>

			<Outlet />
		</>
	)
}

export default Posts
