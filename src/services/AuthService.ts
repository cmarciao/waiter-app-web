import { HttpClient } from './utils/HttpClient';

export type SignInParams = {
	email: string;
	password: string;
}

class AuthService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3333');
	}

	async signIn(params: SignInParams){
		const response = this.httpClient.post('/auth/signin', {
			body: JSON.stringify(params),
		});

		return response;
	}
}

export default new AuthService();
