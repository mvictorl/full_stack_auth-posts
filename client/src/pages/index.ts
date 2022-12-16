import { IPages } from '../models/IPages'

const pages: IPages[] = [
	{
		name: 'Products',
		link: 'products',
		access: 'PUBLIC',
	},
	{
		name: 'Pricing',
		link: 'pricing',
		access: 'PUBLIC',
	},
	{
		name: 'Posts',
		link: 'posts',
		access: 'PUBLIC',
	},
	{
		name: 'Options',
		link: 'options',
		access: 'ADMIN',
	},
]

export default pages
