import express, { Express } from "express";
import { IDatabase } from "./interfaces/database";

export class Server {
  private static instance: Server;
  private server: Express;

  private constructor(private readonly database?: IDatabase) {
    this.server = express();
  }

  public start() {
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

  public static getInstance(database?: IDatabase): Server {
    if (!Server.instance) {
      Server.instance = new Server(database);
    }

    return Server.instance;
  }
}
