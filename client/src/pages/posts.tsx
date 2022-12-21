// import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'
// import { useAuth } from '../hooks/useAuth'

const Posts = () => {
	// const auth = useAuth()
	// const navigate = useNavigate()
	const location = useLocation()

	// useEffect(() => {
	// 	if (!auth.isAuth) navigate('/login')
	// 	// eslint-disable-next-line
	// }, [])

	return (
		<>
			<Container>
				<Typography textAlign="justify" variant="h3">
					Posts
				</Typography>
				<Typography textAlign="justify">
					{location.pathname} {location.key} {location.state}
				</Typography>
				<Typography textAlign="justify">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime et ea
					distinctio repellendus veritatis officia, sunt explicabo repudiandae
					vitae at sed. Molestiae hic autem deserunt quasi laudantium deleniti.
					Expedita, a!
				</Typography>
			</Container>
			<Button to="./23" component={Link} variant="contained">
				Link
			</Button>
			<Outlet />
		</>
	)
}

export default Posts
