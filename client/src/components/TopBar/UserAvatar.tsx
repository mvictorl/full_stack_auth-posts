import { useState, MouseEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material'
import {
	Login as LogIn,
	Logout as LogOut,
	HowToReg as Activate,
	AccountBox,
	Settings,
} from '@mui/icons-material'

import { useAuth } from '../../hooks/useAuth'

const UserAvatar = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const { isAuth, user, signout } = useAuth()

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const handleProfile = async () => {
		setAnchorElUser(null)
		navigate('/profile')
	}
	const handleAccount = async () => {
		setAnchorElUser(null)
		navigate('/account')
	}
	const handleActivate = async () => {
		setAnchorElUser(null)
		navigate('/activate')
	}
	const handleLogout = async () => {
		await signout()
		setAnchorElUser(null)
		navigate(location.pathname)
	}

	if (isAuth) {
		return (
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Open settings">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar alt={user.name} />
					</IconButton>
				</Tooltip>
				<Menu
					sx={{ mt: '45px' }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					<ListItemText sx={{ marginX: '1rem', marginY: '.5rem' }}>
						<Typography sx={{ fontWeight: 'bold', textAlign: 'right' }}>
							{user.name}
						</Typography>
					</ListItemText>
					<Divider />
					{user.isActivated ? (
						[
							<MenuItem onClick={handleProfile} key="Profile">
								<ListItemIcon>
									<AccountBox />
								</ListItemIcon>
								<ListItemText>
									<Typography textAlign="left">Profile</Typography>
								</ListItemText>
							</MenuItem>,
							<MenuItem onClick={handleAccount} key="Account">
								<ListItemIcon>
									<Settings />
								</ListItemIcon>
								<ListItemText>
									<Typography textAlign="left">Account</Typography>
								</ListItemText>
							</MenuItem>,
						]
					) : (
						<MenuItem onClick={handleActivate}>
							<ListItemIcon>
								<Activate />
							</ListItemIcon>
							<ListItemText>
								<Typography textAlign="left">Activate</Typography>
							</ListItemText>
						</MenuItem>
					)}
					<Divider />
					<MenuItem onClick={handleLogout}>
						<ListItemIcon>
							<LogOut />
						</ListItemIcon>
						<ListItemText>
							<Typography textAlign="left">Logout</Typography>
						</ListItemText>
					</MenuItem>
				</Menu>
			</Box>
		)
	} else {
		return (
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Login">
					<IconButton
						sx={{ p: 0 }}
						to="/login"
						state={{ from: location.pathname }}
						component={Link}
					>
						<LogIn
							sx={{
								fontWeight: 700,
								textDecoration: 'none',
								color: 'white',
							}}
						/>
					</IconButton>
				</Tooltip>
			</Box>
		)
	}
}

export default UserAvatar
