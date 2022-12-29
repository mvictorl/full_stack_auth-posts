import { IconButton, Tooltip } from '@mui/material'
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo'

type Props = {
	onPasteCode: (code: string) => void
	checkFormat?: RegExp
}

const PasteFromClipboardButton = ({ onPasteCode, checkFormat }: Props) => {
	const handleClick = async () => {
		const codeFromClipboard = await navigator.clipboard.readText()
		if (checkFormat)
			if (checkFormat.test(codeFromClipboard)) onPasteCode(codeFromClipboard)
			else return
		else onPasteCode(codeFromClipboard)
	}

	return (
		<Tooltip title="Paste Activation code">
			<IconButton onClick={handleClick}>
				<ContentPasteGoIcon />
			</IconButton>
		</Tooltip>
	)
}

export default PasteFromClipboardButton
