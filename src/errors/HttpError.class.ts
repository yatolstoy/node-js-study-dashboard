export class HTTPError extends Error {
	message: string;
	code: number;
	context?: string;

	constructor(message: string, code: number, context?: string) {
		super(message);

		this.message = message
		this.code = code 
		this.context = context
	}
}