import express, { Express } from "express";
import { WeatherController } from "./controllers/weather.controller";
import { IController } from "./interfaces/controller";
import { IDatabase } from "./interfaces/database";
import { client } from "./database/config";
import { PostgreDB } from "./database/database";
import { OpenWeatherMapService } from "./services/openweathermap.service";
import { WeatherService } from "./services/weather.service";
import { WeatherDBService } from "./services/weatherDB.service";
require("dotenv").config();

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
    this.server.listen(process.env.SERVER_PORT || 3000, async () => {
      console.log("Server is ready");
      try {
        await this.database.conenct();
        console.log("Connected to DB");
      } catch (e) {
        console.log("An error occured while connecting to the database.");
      }
    });
  }

  public static bootstrap(): Server {
    if (!Server.instance) {
      const db = new PostgreDB(client);
      Server.instance = new Server(
        [
          new WeatherController(
            new WeatherService(
              new WeatherDBService(db),
              new OpenWeatherMapService()
            )
          ),
        ],
        db
      );
    }

    return Server.instance;
  }
}
