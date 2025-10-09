import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './db'; // Importar la conexión a PostgreSQL

import loginRouter from './rutasBack/login';
import refreshTokenRouter from './rutasBack/refreshToken';
import signOutRouter from './rutasBack/signout';
import signupRouter from './rutasBack/signup';
import todosRouter from './rutasBack/todos';
import userRouter from './rutasBack/user';

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

app.get('/', (req, res) => {
  res.send('Backend is running with PostgreSQL');
});

app.listen(PORT, () => {
  console.log(`Server iniciado en http://localhost:${PORT}`);
});