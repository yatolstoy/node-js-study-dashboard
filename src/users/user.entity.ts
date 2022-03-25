import { hash, compare } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(private readonly _login: string, private readonly _name?: string) {}

	get login(): string {
		return this._login;
	}

	get name(): string | null {
		return this._name || null;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: string): Promise<void> {
		const hashPassword = await hash(pass, Number(salt));
		this._password = hashPassword;
	}

	public async comparePassword(password: string, hash: string): Promise<boolean> {
		return await compare(password, hash);
	}
}
