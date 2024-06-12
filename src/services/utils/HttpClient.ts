/* eslint-disable @typescript-eslint/no-explicit-any */

type HttpClientInit = Omit<RequestInit, 'method'>;

type ConfigRequestInterpector = RequestInit & {
	headers: Headers;
}

type InterceptorRequest = (config: ConfigRequestInterpector) => void;

export class HttpClient {
	private requestInterceptors: InterceptorRequest[] = [];

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

	addInterceptorRequest(callback: InterceptorRequest) {
		this.requestInterceptors.push(callback);
	}

	private async makeRequest(path: string, config?: RequestInit) {
		const headers = new Headers();
		const requestConfig = { ...config, headers };

		this.requestInterceptors.forEach(interceptor =>
			interceptor(requestConfig)
		);

		const response = await fetch(`${this.baseURL}${path}`, requestConfig);

		let responseBody: any = null;
		const contentType = response.headers.get('Content-Type');

		if(contentType?.includes('application/json')) {
			responseBody = await response.json();
		}

		return responseBody;
	}
}
