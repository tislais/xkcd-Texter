import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a item in our database with name and url and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/texts')
      .send({ 
        name: 'tis',
        zip: 97213,
        comic: ''
      });
    
    expect(res.body).toEqual({
      id: 1,
      name: 'tis',
      comic: expect.any(String),
      zip: 97213
    });
  });

});

