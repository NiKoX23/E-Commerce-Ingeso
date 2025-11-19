import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import loginRouter from './rutasBack/login';
import refreshTokenRouter from './rutasBack/refreshToken';
import signOutRouter from './rutasBack/signout';
import signupRouter from './rutasBack/signup';
import todosRouter from './rutasBack/todos';
import userRouter from './rutasBack/user';
import productosRouter from './rutasBack/productos';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/login', loginRouter);
app.use('/api/refreshToken', refreshTokenRouter);
app.use('/api/signOut', signOutRouter);
app.use('/api/signup', signupRouter);
app.use('/api/todos', todosRouter);
app.use('/api/user', userRouter);
app.use('/api/productos', productosRouter);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server inciado en http://localhost:${PORT}`);
});
