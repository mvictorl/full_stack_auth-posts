import { ReactElement } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type Props = {
	allowedRole: string
	redirectToLogin?: string
	redirectToActivation?: string
	children?: ReactElement
}

export const ProtectedRoute = ({
	allowedRole,
	redirectToLogin = '/login',
	redirectToActivation = '/activate',
	children,
}: Props): ReactElement => {
	const { user } = useAuth()
	const location = useLocation()

	if (user.roles && user.roles.includes(allowedRole))
		if (user.isActivated)
			return children ? children : <Outlet />
		else {
			return (
				<Navigate
				to={redirectToActivation}
				state={{ from: location.pathname }}
				replace
			/>
			)
		}
	else {
		return (
			<Navigate
					to={redirectToLogin}
					state={{ from: location.pathname }}
					replace
				/>
		)
	}
}
