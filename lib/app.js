import express from 'express';
import comicController from './controllers/comics.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());

app.use('/api/v1/comics', comicController);

if (app) {
  console.log('app go brr');
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
