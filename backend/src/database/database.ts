import { Client, ClientConfig } from "pg";
import { IDatabase } from "../interfaces/database";

export class PostgreDB implements IDatabase {
  private client: Client;

  constructor(private readonly clientConfig: ClientConfig) {
    this.client = new Client(this.clientConfig);
  }

  public conenct() {
    return this.client.connect().then(() => true);
  }

  public disconnect() {
    return this.client.end().then(() => true);
  }

  public query(queryString: string): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.client.query(queryString, (err, res) => {
        if (err) reject(err);
        return resolve(res);
      });
    });
  }
}
