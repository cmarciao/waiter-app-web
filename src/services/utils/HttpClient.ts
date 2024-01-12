import { getServerSession } from 'next-auth';

type HttpClientInit = Omit<RequestInit, 'method'>;

export class HttpClient {
	constructor(private readonly baseURL: string) {}

	get(path: string, config?: RequestInit) {
		return this.makeRequest(path, config);
	}

	post(path: string, config?: HttpClientInit) {
		return this.makeRequest(path, {
			method: 'POST',
			...config
		});
	}

	put(path: string, config?: HttpClientInit) {
		return this.makeRequest(path, {
			method: 'PUT',
			...config
		});
	}

	patch(path: string, config?: HttpClientInit) {
		return this.makeRequest(path, {
			method: 'PATCH',
			...config
		});
	}

	delete(path: string, config?: HttpClientInit) {
		return this.makeRequest(path, {
			method: 'DELETE',
			...config
		});
	}

	private async makeRequest(path: string, config?: RequestInit) {
		const headers = new Headers();

		if(config?.body) {
			headers.append('Content-Type', 'application/json');
		}

		const session = await getServerSession();

		if(session?.user?.name) {
			headers.append('Authorization', `Bearer ${session?.user?.name}`);
		}

		const response = await fetch(
			`${this.baseURL}${path}`,
			{
				...config,
				headers
			}
		);

		let responseBody = null;
		const contentType = response.headers.get('Content-Type');

		if(contentType?.includes('application/json')) {
			responseBody = await response.json();
		}

		return responseBody;
	}
}
