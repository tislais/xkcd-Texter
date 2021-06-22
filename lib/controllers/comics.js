import { Router } from 'express';
import Comic from '../models/Comic.js';
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
