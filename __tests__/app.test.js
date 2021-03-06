import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Text from '../lib/models/Text.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a item in our database with name and url and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/texts')
      .send({ 
        name: 'Tis',
        zip: 97213,
        comic: ''
      });
    
    expect(res.body).toEqual({
      id: 1,
      name: 'Tis',
      comic: expect.any(String),
      zip: 97213
    });
  });

  it('finds all texts via GET', async () => {

    const textOne = await Text.insert({ 
      name: 'Kaysar',
      zip: 90210,
      comic: ''
    });
    const textTwo = await Text.insert({ 
      name: 'Janelle',
      zip: 33101,
      comic: ''
    });
    const res = await request(app).get('/api/v1/texts');  

    expect(res.body).toEqual([textOne, textTwo]);
  });

  it('finds an order by id via GET', async () => {
    const text = await Text.insert({
      name: 'Marisol',
      zip: 85001,
      comic: ''
    });
    const res = await request(app).get(`/api/v1/texts/${text.id}`);
    expect(res.body).toEqual(text);
  });

  it('updates a value in the db and sends a text', async () => {

    const text = await Text.insert({
      name: 'Marisol',
      zip: 85001,
      comic: ''
    });

    text.name = 'Eleanor';

    const updatedText = {
      id: 1,
      name: 'Eleanor',
      comic: expect.any(String),
      zip: 85001
    };
    
    const res = await request(app)
      .put(`/api/v1/texts/${text.id}`)
      .send({
        name: 'Eleanor'
      });
    
    expect(res.body).toEqual(updatedText);
  });

  it('it deletes an item from the database and sends a text', async () => {
    
    const text = await Text.insert({
      name: 'Marisol',
      zip: 85001,
      comic: ''
    });

    const res = await request(app)
      .delete(`/api/v1/texts/${text.id}`);
    
    expect(res.body).toEqual(text);
  });

});

