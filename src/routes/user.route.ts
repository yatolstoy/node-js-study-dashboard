import express from 'express';

const userRouter = express.Router();

userRouter.get('/login', (req, res) => {
	res.status(200).json({message: 'Is`s working'});
});

export {userRouter};