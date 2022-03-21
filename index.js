import express from 'express';
import { userRouter } from './routes/user.route.js'

const port = 8000;
const app = express();

app.use('/router', userRouter);

app.get('/hello', (req, res) => {
	res.send('У меня получилось!');
})

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});