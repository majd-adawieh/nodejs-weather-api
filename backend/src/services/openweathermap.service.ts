import axios from "axios";

export class OpenWeatherMapService {
  constructor() {}

  public getWeather(lat: string, lon: string) {
    const API_KEY = "9b811ef66919170a600c1ca41f245b5b";
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((res) => res.data);
  }
}
