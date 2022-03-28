import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - no name', async () => {
		const res = await request(application.app)
			.post('/user/register')
			.send({ login: 'test', password: '1' });
		expect(res.statusCode).toBe(422);
	});

	it('Register exist user', async () => {
		const res = await request(application.app)
			.post('/user/register')
			.send({ login: 'test', password: '1', name: 'Семён' });
		expect(res.statusCode).toBe(433);
	});

	it('Success user login', async () => {
		const res = await request(application.app)
			.post('/user/login')
			.set({ 'Content-type': 'application/json' })
			.send({ login: 'tester1', password: '123' });
		expect(res.statusCode).toBe(200);
		expect(res.body.jwt).toBeTruthy();
	});

	it('Success login and success get info', async () => {
		const res = await request(application.app)
			.post('/user/login')
			.send({ login: 'tester1', password: '123' });
		const info = await request(application.app)
			.get('/user/info')
			.set('Authorization', `Bearer ${res.body.jwt}`);
		expect(info.statusCode).toBe(200);
		expect(info.body.id).toBe(4);
	});
});

afterAll(async () => {
	await application.close();
});
