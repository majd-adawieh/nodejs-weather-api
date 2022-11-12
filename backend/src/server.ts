import express, { Express } from "express";

export class Server {
  private static instance: Server;
  private server: Express;

  private constructor() {
    this.server = express();
  }

  public start() {
    this.server.listen(3000, () => {
      console.log("Server is ready");
    });
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }

    return Server.instance;
  }
}
