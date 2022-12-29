import { useState, MouseEvent } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import {
	AppBar,
	Box,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material'
import { Adb as AdbIcon, Menu as MenuIcon } from '@mui/icons-material'
import pages from '../../pages'

import { useAuth } from '../../hooks/useAuth'
import UserAvatar from './UserAvatar'

import './TopBar.css'

const TopBar = () => {
	const navigate = useNavigate()

	const auth = useAuth()

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleClickNavMenuItem = (link: string) => {
		setAnchorElNav(null)
		navigate(link)
	}

	const currentPages = pages.filter(p => {
		if (p.access === 'PUBLIC') {
			return true
		} else {
			if (
				auth.user != null &&
				auth.user.roles != null &&
				auth.user.roles.includes(p.access)
			) {
				return true
			}
		}
		return false
	})

	return (
		<AppBar position="sticky">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{currentPages.map(page => (
								<MenuItem
									key={page.name}
									onClick={() => handleClickNavMenuItem(page.link)}
								>
									<Typography textAlign="center">{page.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 5,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							justifyContent: 'flex-start',
							alignItems: 'center',
							display: { xs: 'none', md: 'flex' },
						}}
					>
						{currentPages.map(page => (
							<NavLink
								key={page.name}
								to={page.link}
								style={{ textDecoration: 'none' }}
							>
								<Typography
									noWrap
									className="menu-item"
									sx={{
										marginX: '.5rem',
										display: 'block',
										flexGrow: 1,
										fontWeight: 700,
										color: 'white',
										textTransform: 'uppercase',
										textDecoration: 'none',
										'&:not(.active):hover': { pb: '.2rem' },
									}}
								>
									{page.name}
								</Typography>
							</NavLink>
						))}
					</Box>

					<UserAvatar />
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default TopBar
