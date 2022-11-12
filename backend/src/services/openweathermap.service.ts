import axios from "axios";
require("dotenv").config();

export class OpenWeatherMapService {
  private API_KEY = process.env.OPEN_WEATHER_API_KEY;
  private BASE_URL = process.env.OPEN_WEATHER_URL;

  constructor() {}

  public getWeather(lat: string, lon: string) {
    return axios
      .get(
        `${this.BASE_URL}data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.API_KEY}`
      )
      .then((res) => res.data);
  }

  public getCityNameByCoordinates(lat: string, lon: string) {
    const API_KEY = "9b811ef66919170a600c1ca41f245b5b";

    return axios
      .get(
        `${this.BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${this.API_KEY}`
      )
      .then((res) => res.data);
  }
}
