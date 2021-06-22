import { sendSms } from '../utils/twilio.js';
import Text from '../models/Text.js';
import app from '../app.js';
import request from 'superagent'; 

export default class TextService {
  static async create({ name, comic, zip }) {

    const randomNumber = Math.floor(Math.random() * 2479);

    const xkcdResponse = await request.get(`https://xkcd.com/${randomNumber}/info.0.json`);
    const weatherResponse = await request.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${process.env.OPENWEATHERMAP_KEY}&units=imperial`);

    const city = weatherResponse.body.name;
    const currentTemp = weatherResponse.body.main.temp;

    comic = xkcdResponse.body.img;
    
    const text = await Text.insert({ name, comic, zip });
    await sendSms(
      process.env.RECIPIENT_NUMBER,
      `Hey ${name}! It is currently ${currentTemp}°F in ${city} today! Here's a random xkcd: ${comic}`
    );    

    return text;
  }

  static async update({ name, comic, zip }, id) {

    const randomNumber = Math.floor(Math.random() * 2479);

    const xkcdResponse = await request.get(`https://xkcd.com/${randomNumber}/info.0.json`);
    const weatherResponse = await request.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${process.env.OPENWEATHERMAP_KEY}&units=imperial`);

    const city = weatherResponse.body.name;
    const currentTemp = weatherResponse.body.main.temp;

    comic = xkcdResponse.body.img;
    
    const text = await Text.change({ name, id });
    
    await sendSms(
      process.env.RECIPIENT_NUMBER,
      `Ooh, I love the new name, ${name}! It is currently ${currentTemp}°F in ${city} today! Here's a random xkcd: ${comic}`
    );

    return text;
  }

  static async delete({ quantity }, id) {

    const order = await Order.remove({ quantity, id });

    await sendSms(
      process.env.RECIPIENT_NUMBER,
      `Order #${id} has been deleted`
    );

    return order;
  }
}
