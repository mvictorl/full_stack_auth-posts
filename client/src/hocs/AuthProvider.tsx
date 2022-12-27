import { createContext, useState, ReactNode, useEffect } from 'react'
import { IUser } from '../models/IUser'
import AuthService from '../services/AuthService'
import { IValidationErrorResponse } from '../models/IValidationErrorResponse'

type Props = {
	children?: ReactNode
}

const initAuthContext = {
	// accessToken: '',
	isAuth: false,
	user: {} as IUser,
	isLoading: false,
	errors: [] as IValidationErrorResponse[],
	signin: (email: string, password: string): Promise<void> | void => {},
	signup: (
		name: string,
		email: string,
		password: string,
		confirm: string
	): Promise<void> | void => {},
	signout: (): Promise<void> | void => {},
	activate: (code: string): Promise<void> | void => {},
	clearErrors: (): void => {},
}
export const AuthContext = createContext(initAuthContext)

export const AuthProvider = ({ children }: Props) => {
	const [isAuth, setIsAuth] = useState(initAuthContext.isAuth)
	const [user, setUser] = useState(initAuthContext.user)
	const [isLoading, setIsLoading] = useState(initAuthContext.isLoading)
	const [errors, setErrors] = useState([] as IValidationErrorResponse[])

	useEffect(() => {
		try {
			AuthService.check().then(
				res => {
					if (res.data) {
						localStorage.setItem('bearer-token', res.data?.accessToken)
						localStorage.setItem('isauth', 'true')
						setIsAuth(true)
						setUser(res.data.user)
					} else {
						localStorage.clear() // removeItem('bearer-token')
						setIsAuth(false)
						setUser({} as IUser)
					}
				},
				error => {
					localStorage.clear() // removeItem('bearer-token')
					setIsAuth(false)
					setUser({} as IUser)
					console.error(error)
				}
			)
		} catch (e: any) {
			console.error(e.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const signin = async (email: string, password: string) => {
		setIsLoading(true)
		try {
			return await AuthService.login(email, password).then(
				res => {
					localStorage.setItem('bearer-token', res.data.accessToken)
					localStorage.setItem('isauth', 'true')
					setIsAuth(true)
					setUser(res.data.user)
					setErrors([])
				},
				error => {
					if (error.response?.data?.message === 'Validation error') {
						setErrors(error.response?.data?.errors)
					} else console.error(error)
				}
			)
		} catch (e: any) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	const signup = async (
		name: string,
		email: string,
		password: string,
		confirm: string
	) => {
		setIsLoading(true)
		try {
			return await AuthService.registration(
				name,
				email,
				password,
				confirm
			).then(
				res => {
					localStorage.setItem('bearer-token', res.data?.accessToken)
					localStorage.setItem('isauth', 'true')
					setIsAuth(true)
					setUser(res.data.user)
				},
				error => {
					if (error.response?.data?.message === 'Validation error') {
						setErrors(error.response?.data?.errors)
					} else console.error(error)
				}
			)
		} catch (e: any) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	const signout = async () => {
		setIsLoading(true)
		try {
			return await AuthService.logout().then(res => {
				localStorage.clear()
				setIsAuth(false)
				setUser({} as IUser)
			})
		} catch (e: any) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	const activate = async (code: string) => {
		setIsLoading(true)
		try {
			return await AuthService.activate(code).then(
				res => {
					localStorage.setItem('bearer-token', res.data.accessToken)
					localStorage.setItem('isauth', 'true')
					setIsAuth(true)
					setUser(res.data.user)
					setErrors([])
				},
				error => {
					console.error(error)
				}
			)
		} catch (e) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	const clearErrors = () => {
		setErrors([] as IValidationErrorResponse[])
	}

	const value = {
		// accessToken,
		isAuth,
		user,
		isLoading,
		errors,
		signin,
		signup,
		signout,
		activate,
		clearErrors,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
