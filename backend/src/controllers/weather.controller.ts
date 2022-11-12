import { Router } from "express";
import { IController } from "../interfaces/controller";

export class WeatherController implements IController {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getController() {
    this.getWeather();
    return this.router;
  }

  public getWeather() {
    this.router.get("/weather", (req, res, next) => {
      return res.json("HALLO WORLD");
    });
  }
}
