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
      const text = await Text.findById(req.params.id);
      res.send(text);
    } catch(err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    
    try {
      
      const text = await TextService.update(req.body, req.params.id);
      res.send(text);
      
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const text = await TextService.delete(req.body, req.params.id);
      res.send(text);
    } catch(err) {
      next(err);
    }
  })



;
