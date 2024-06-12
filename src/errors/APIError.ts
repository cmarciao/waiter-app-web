export class APIError extends Error {
	message: string;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(readonly response: Response, body: any) {
		super();

		this.name = 'APIError';
		this.message = body?.message || `${response.status} - ${response.statusText}`;
	}
}
