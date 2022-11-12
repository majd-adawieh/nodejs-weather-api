import { WeatherDBService } from "./weatherDB.service";
import { OpenWeatherMapService } from "./openweathermap.service";

enum WEATHER_STATUS {
  GOOD = "Good",
  BAD = "Bad",
  OK = "Ok",
}

export class WeatherService {
  constructor(
    private readonly weatherDBService: WeatherDBService,
    private readonly openWeatherService: OpenWeatherMapService
  ) {}

  public async getWeather(lat: string, lon: string) {
    const results = await this.openWeatherService.getCityNameByCoordinates(
      lat,
      lon
    );
    const weatherInformation = await this.openWeatherService.getWeather(
      lat,
      lon
    );
    const weatherStatus = this.getWeatherStatus(weatherInformation.main.temp);
    const city = results.length > 0 ? results[0].name : "City not found";
    await this.weatherDBService.insert(
      lat,
      lon,
      city,
      weatherStatus,
      new Date().toISOString()
    );
    return {
      status: weatherStatus,
      temperature: weatherInformation.main.temp,
      location: city,
    };
  }

  public async getAllWeatherRequests() {
    return this.weatherDBService.getAll();
  }

  private getWeatherStatus(temp: number) {
    if (temp >= 86) return WEATHER_STATUS.GOOD;
    if (temp >= 68) return WEATHER_STATUS.OK;
    return WEATHER_STATUS.BAD;
  }
}
