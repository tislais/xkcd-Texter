import { Router } from 'express';
import Text from '../models/Text.js';
import ComicService from '../services/ComicService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const comic = await ComicService.create(req.body);
      res.send(comic);
    } catch(err) {
      next(err);
    }
  })



;
