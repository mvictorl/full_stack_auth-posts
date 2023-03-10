import {
	Paper,
	TextField,
	Stack,
	Grid,
	Link,
	Typography,
	InputAdornment,
	IconButton,
	useTheme,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormEvent, useState, useEffect } from 'react'
import { useNavigate, useLocation, Link as rrdLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type Props = {
	state?: {
		from: string
	}
}
const LoginForm = ({ state }: Props) => {
	const { isAuth, errors, isLoading, signin, clearErrors } = useAuth()

	const [email, setEmail] = useState<string>('')
	const [emailError, setEmailError] = useState<string>(' ')

	const [password, setPassword] = useState<string>('')
	const [passwordShow, setPasswordShow] = useState<boolean>(false)
	const [passwordError, setPasswordError] = useState<string>(' ')

	const theme = useTheme()
	const from: string = useLocation().state?.from || '/'
	const navigate = useNavigate()

	const togglePasswordShow = () => {
		setPasswordShow(prev => !prev)
	}

	useEffect(() => {
		if (isAuth) {
			navigate(from)
		}
		// eslint-disable-next-line
	}, [isAuth])

	useEffect(() => {
		if (errors.length > 0) {
			errors.forEach(e => {
				switch (e.param) {
					case 'email':
						setEmailError(e.msg)
						setEmail(e.value)
						break
					case 'password':
						setPasswordError(e.msg)
						setPassword(e.value)
						break
				}
			})
		}
		clearErrors()
		// eslint-disable-next-line
	}, [errors])

	const handlerLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await signin(email, password)
	}

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
						onSubmit={e => handlerLogin(e)}
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
							Sign in
						</Typography>
						<TextField
							onChange={e => setEmail(e.target.value)}
							onFocus={() => setEmailError(' ')}
							value={email}
							margin="normal"
							fullWidth
							label="Email Address"
							name="email"
							type="email"
							placeholder="Email Address"
							error={emailError !== ' '}
							helperText={emailError}
						/>

						<TextField
							onChange={e => setPassword(e.target.value)}
							onFocus={() => setPasswordError(' ')}
							value={password}
							margin="normal"
							fullWidth
							label="Password"
							name="password"
							type={passwordShow ? 'text' : 'password'}
							placeholder="Password"
							error={passwordError !== ' '}
							helperText={passwordError}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={togglePasswordShow}
											// onMouseDown={togglePasswordShow}
											edge="end"
										>
											{passwordShow ? <VisibilityOff /> : <Visibility />}
										</IconButton>
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
							Login
						</LoadingButton>
					</Stack>
					<Link
						component={rrdLink}
						to="../registration"
						underline="hover"
						marginTop={2}
						sx={{ float: 'right' }}
					>
						Create an account
					</Link>
				</Paper>
			</Grid>
			<Grid item xs={0} md={3} lg={4} />
		</Grid>
	)
}

export default LoginForm
