import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import {
	Container,
	createTheme,
	CssBaseline,
	ThemeProvider,
	responsiveFontSizes,
} from '@mui/material'
import TopBar from './components/TopBar/TopBar'

const App = () => {
	let theme = createTheme({
		typography: {
			fontFamily: 'Roboto, sans-serif',
		},
	})
	theme = responsiveFontSizes(theme)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<TopBar />
			<Container component="main" maxWidth="xl" sx={{ mt: '1rem' }}>
				<Suspense fallback={<h1>Loading...</h1>}>
					<Outlet />
				</Suspense>
			</Container>
		</ThemeProvider>
	)
}

export default App
