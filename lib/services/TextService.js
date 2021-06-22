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

  static async update({ name }, id) {  

    const text = await Text.change({ name, id });
    
    await sendSms(
      process.env.RECIPIENT_NUMBER,
      `Ooh, I love the new name, ${name}!`
    );

    return text;
  }

  static async delete(id) {

    const text = await Text.remove(id);

    await sendSms(
      process.env.RECIPIENT_NUMBER,
      `I see all and I know nothing. #${id} deleted.`
    );

    return text;
  }
}
