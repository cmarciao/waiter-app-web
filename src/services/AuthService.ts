import { api } from './utils/api';

export type SignInParams = {
	email: string;
	password: string;
}

export type RefreshTokenParams = {
	id: string;
}

class AuthService {
	async signInService(params: SignInParams){
		return api.post('/auth/signin', {
			body: JSON.stringify(params),
		});
	}

	async refreshTokenService(params: RefreshTokenParams) {
		return api.post('/auth/refresh-token', {
			body: JSON.stringify(params)
		});
	}
}

export default new AuthService();
