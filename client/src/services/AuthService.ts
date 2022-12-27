import { $api } from '../http'
import { AxiosResponse } from 'axios'
import { IAuthResponse } from '../models/IAuthResponse'

export default class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('/user/login', { email, password })
	}

	static async registration(
		name: string,
		email: string,
		password: string,
		passwordConfirm: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('/user/registration', {
			name,
			email,
			password,
			passwordConfirm,
		})
	}

	static async logout(): Promise<void> {
		return $api.post('/user/logout')
	}

	static async check(): Promise<AxiosResponse<IAuthResponse>> {
		return $api.get<IAuthResponse>('/user/check')
	}

	static async activate(code: string): Promise<AxiosResponse<IAuthResponse>> {
		return $api.patch<IAuthResponse>('/user/activate/', { code })
	}
}
