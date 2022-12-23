import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
	const error = useRouteError() as any

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<div
				id="error-page"
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<h1
					style={{
						fontSize: '10rem',
						marginBottom: 0,
						color: 'red',
						textShadow: '5px 5px 2px rgba(0, 0, 0, .3)',
					}}
				>
					{error.status}
				</h1>
				<p style={{ fontSize: '2rem' }}>
					<i>Sorry, an error has occurred</i>
				</p>
				<p style={{ fontSize: '1.5rem', color: 'red' }}>
					{error.statusText || error.message}
				</p>
			</div>
		</div>
	)
}

export default ErrorPage
