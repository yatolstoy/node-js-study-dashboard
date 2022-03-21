import express from 'express';
import { errorHandler } from './middlewares/error.middleware.js';
import { userRouter } from './routes/user.route.js'

const port = 8000;
const app = express();

app.use('/router', userRouter);

app.get('/hello', (req, res) => {
	throw new Error('Кастомная ошибка!');
})

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});