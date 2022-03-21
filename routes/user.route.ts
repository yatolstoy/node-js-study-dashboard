import express from 'express';

const userRouter = express.Router();

userRouter.get('/hello', (req, res) => {
	res.status(200).json({message: 'Is`s working'});
});

export {userRouter};