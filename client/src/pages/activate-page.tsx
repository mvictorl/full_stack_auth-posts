import { Container, Typography } from '@mui/material'
import { useAuth } from '../hooks/useAuth'

const ActivatePage = () => {
	const auth = useAuth()
	return (
		<>
			<Container>
				<Typography textAlign="justify" variant="h3">
					Activate Page
				</Typography>
				<Typography textAlign="justify">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime et ea
					distinctio repellendus veritatis officia, sunt explicabo repudiandae
					vitae at sed. Molestiae hic autem deserunt quasi laudantium deleniti.
					Expedita, a!
				</Typography>
			</Container>
		</>
	)
}

export default ActivatePage
