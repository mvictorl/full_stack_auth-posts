import { useState, FormEvent } from 'react'
import { Navigate, useNavigate, Link as rrdLink } from 'react-router-dom'
import {
	Grid,
	InputAdornment,
	Link,
	Paper,
	Stack,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useAuth } from '../../hooks/useAuth'
import PasteFromClipboardButton from './PasteFromClipboardButton'

const ActivateInput = () => {
	const theme = useTheme()
	const { isAuth, activate, isLoading } = useAuth()
	const navigate = useNavigate()

	const [code, setCode] = useState<string>('')

	const regexExpUUID =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

	const handleCodePaste = (newCode: string) => {
		setCode(newCode)
	}

	const handlerAcivate = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await activate(code)
		navigate('/')
	}

	if (isAuth) {
		return (
			<Grid container>
				<Grid item xs={0} md={3} lg={4} />
				<Grid item xs={12} md={6} lg={4}>
					<Paper
						sx={{
							padding: 1,
						}}
					>
						<Stack
							component="form"
							onSubmit={e => handlerAcivate(e)}
							direction="column"
							sx={{
								marginTop: 2,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 700,
									color: theme.palette.primary.main,
								}}
							>
								Activation Account
							</Typography>

							<TextField
								onChange={e => setCode(e.target.value)}
								value={code}
								margin="normal"
								fullWidth
								label="Activation Code"
								placeholder="Activation Code"
								name="code"
								type="text"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<PasteFromClipboardButton
												onPasteCode={handleCodePaste}
												checkFormat={regexExpUUID}
											/>
										</InputAdornment>
									),
								}}
							/>

							<LoadingButton
								type="submit"
								variant="contained"
								sx={{ mt: 1, mb: 1, width: '50%' }}
								loading={isLoading}
								disabled={isLoading}
								loadingPosition="center"
							>
								Activate
							</LoadingButton>
						</Stack>
						<Link
							component={rrdLink}
							to="/"
							underline="hover"
							marginTop={2}
							sx={{ float: 'right' }}
						>
							Go Home
						</Link>
					</Paper>
				</Grid>
				<Grid item xs={0} md={3} lg={4} />
			</Grid>
		)
	} else {
		return <Navigate to="/" replace />
	}
}

export default ActivateInput
