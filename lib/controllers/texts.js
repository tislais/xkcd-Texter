import { Router } from 'express';
import Text from '../models/Text.js';
import TextService from '../services/TextService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const comic = await TextService.create(req.body);
      res.send(comic);
    } catch(err) {
      next(err);
    }
  })



;
