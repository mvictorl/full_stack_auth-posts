import { IUser } from './IUser'

export interface IPost {
	id: string
	title: string
	body: string
	createdAt: Date
	author: IUser
}
