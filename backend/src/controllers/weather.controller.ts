import { Router } from "express";
import { IController } from "../interfaces/controller";
import { WeatherService } from "../services/weather.service";

export class WeatherController implements IController {
  private router: Router;

  constructor(private weatherService: WeatherService) {
    this.router = Router();
  }

  public getController() {
    this.getWeather();
    return this.router;
  }

  public async getWeather() {
    this.router.get("/weather", async (req, res, next) => {
      const lan = <string>req.query.lat;
      const lon = <string>req.query.lon;
      const result = await this.weatherService.getWeather(lan, lon);
      return res.json(result);
    });
  }
}
