import { hash } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(private readonly _login: string, private readonly _name: string) {}

	get login(): string {
		return this._login;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string): Promise<void> {
		const hashPassword = await hash(pass, 10);
		this._password = hashPassword;
	}
}
