import express, { Express } from "express";
import { WeatherController } from "./controllers/weather.controller";
import { IController } from "./interfaces/controller";
import { IDatabase } from "./interfaces/database";
import { client } from "./database/config";
import { PostgreDB } from "./database/database";
import { OpenWeatherMapService } from "./services/openweathermap.service";
import { WeatherService } from "./services/weather.service";

export class Server {
  private static instance: Server;
  private server: Express;

  private constructor(
    private readonly controllers: IController[],
    private readonly database: IDatabase
  ) {
    this.server = express();
  }

  public start() {
    this.controllers.forEach((controller) => {
      this.server.use(controller.getController());
    });
    this.server.listen(3000, async () => {
      console.log("Server is ready");
      if (this.database) {
        try {
          await this.database.conenct();
          console.log("Connected to DB");
        } catch (e) {
          console.log("An error occured while connecting to the database.");
        }
      }
    });
  }

  public static bootstrap(): Server {
    if (!Server.instance) {
      Server.instance = new Server(
        [
          new WeatherController(
            new WeatherService(new OpenWeatherMapService())
          ),
        ],
        new PostgreDB(client)
      );
    }

    return Server.instance;
  }
}
