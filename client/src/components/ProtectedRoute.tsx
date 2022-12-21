import { ReactElement } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type Props = {
	allowedRole: string
	redirectPath?: string
	children?: ReactElement
}

export const ProtectedRoute = ({
	allowedRole,
	redirectPath = '/login',
	children,
}: Props): ReactElement => {
	const { user } = useAuth()
	const location = useLocation()

	if (user.roles && user.roles.includes(allowedRole))
		return children ? children : <Outlet />
	else {
		return (
			<Navigate to={redirectPath} state={{ from: location.pathname }} replace />
		)
	}
}
