import express from 'express';
import textController from './controllers/texts.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.use('/api/v1/texts', textController);

if (app) {
  console.log('app go brr');
}


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
