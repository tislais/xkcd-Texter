import { sendSms } from '../utils/twilio.js';
import Comic from '../models/Comic.js';
import app from '../app.js';
import request from 'superagent'; 

export default class ComicService {
  static async create({ name, image, zip }) {

    const randomNumber = Math.floor(Math.random() * 2479);

    const xkcdResponse = await request.get(`https://xkcd.com/${randomNumber}/info.0.json`);
    const weatherResponse = await request.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${process.env.OPENWEATHERMAP_KEY}&units=imperial`);

    const city = weatherResponse.body.name;
    const currentTemp = weatherResponse.body.main.temp;

    image = xkcdResponse.body.img;
    
    const comic = await Comic.insert({ name, image, zip });
    await sendSms(
      process.env.RECIPIENT_NUMBER,
      `Hey ${name}! It is currently ${currentTemp}°F in ${city} today! Here's a random xkcd: ${image}`
    );    

    return comic;
  }
}