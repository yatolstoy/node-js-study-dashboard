import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/user/register')
			.send({ login: 'test', password: '1' });
		expect(res.statusCode).toBe(422);
	});
});

afterAll(async () => {
	await application.close();
});
