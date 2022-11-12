import { OpenWeatherMapService } from "./openweathermap.service";

export class WeatherService {
  constructor(private readonly openWeatherService: OpenWeatherMapService) {}

  public async getWeather(lan: string, lon: string) {
    return this.openWeatherService.getWeather(lan, lon);
  }
}
