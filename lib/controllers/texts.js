import { Router } from 'express';
import Text from '../models/Text.js';
import TextService from '../services/TextService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const text = await TextService.create(req.body);
      res.send(text);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const text = await Text.findAll();
      res.send(text);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const order = await Text.findById(req.params.id);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })



;
