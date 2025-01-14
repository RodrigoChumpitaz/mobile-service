import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userService from './service/user.service';
import { connection } from 'mongoose';
import { response } from './utils';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  })
);

app.get('/', (req: Request, res: Response) => {
  const db = connection.readyState === 1 ? 'connected' : 'disconnected';
  return response(
    res,
    {
      message: 'Welcome to the API',
      status: 'success',
      database: db
    },
    200
  );
});
app.use('/favicon.ico', (req: Request, res: Response) => res.status(204).end() as any);
app.use('/api/v1', userService);

export default app;
