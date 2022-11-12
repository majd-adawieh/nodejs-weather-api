import { Client, ClientConfig } from "pg";
import { IDatabase } from "../interfaces/database";

export class PostgreDB implements IDatabase {
  private client: Client;

  constructor(private readonly clientConfig: ClientConfig) {
    this.client = new Client(clientConfig);
  }

  public conenct() {
    return this.client.connect().then(() => true);
  }

  public disconnect() {
    return this.client.end().then(() => true);
  }

  public query() {
    return new Promise((resolve, reject) => {
      return this.client.query("SELECT NOW()", (err, res) => {
        return resolve(res);
      });
    });
  }
}
