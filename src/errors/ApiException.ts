import { ResponseError } from '@/types/ResponseError';

export class ApiException extends Error {
	readonly error: string;
	readonly statusCode: number;

	constructor({ error, message, statusCode }: ResponseError) {
		super();

		this.error = error;
		this.message = message;
		this.statusCode = statusCode;
	}
}