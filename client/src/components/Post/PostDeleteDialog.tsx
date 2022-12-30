import {
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
	Tooltip,
} from '@mui/material'
import {
	CheckCircle as CheckCircleIcon,
	Cancel as CancelIcon,
} from '@mui/icons-material'

type Props = {
	open: boolean
	setAccept: (open: boolean) => void
}

const PostDeleteDialog = ({ open, setAccept }: Props) => {
	return (
		<Dialog
			open={open}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				Do You want to delete this post?
			</DialogTitle>
			<DialogActions>
				<Tooltip title="Yes" placement="top-end">
					<IconButton size="large" onClick={() => setAccept(true)}>
						<CheckCircleIcon fontSize="inherit" color="success" />
					</IconButton>
				</Tooltip>

				<Tooltip title="No" placement="top-end">
					<IconButton autoFocus onClick={() => setAccept(false)} size="large">
						<CancelIcon fontSize="inherit" color="error" />
					</IconButton>
				</Tooltip>
			</DialogActions>
		</Dialog>
	)
}

export default PostDeleteDialog
