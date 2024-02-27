import { HttpClient } from './utils/HttpClient';

export type SignInParams = {
	email: string;
	password: string;
}

export type RefreshTokenParams = {
	id: string;
}

class AuthService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3333');
	}

	async signIn(params: SignInParams){
		return this.httpClient.post('/auth/signin', {
			body: JSON.stringify(params),
		});
	}

	async refreshToken({ id }: RefreshTokenParams) {
		return this.httpClient.post('/auth/refresh-token', {
			body: JSON.stringify(id)
		});
	}
}

export default new AuthService();
