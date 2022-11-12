import { PostgreDB } from "../database/database";

export class WeatherDBService {
  constructor(private dbClient: PostgreDB) {
    this.init();
  }

  public init() {
    this.dbClient
      .query(
        `CREATE TABLE request_log (
              id SERIAL PRIMARY KEY,
              req_lat varchar(12),
              req_long varchar(12),
              res_city varchar(120),
              res_status varchar(30),
              created_at varchar(30)
      )`
      )
      .then(() => {
        console.log("request_log table is created.");
      })
      .catch((e) => {
        console.log("request_table already exits.");
      });
  }

  public async insert(
    req_lat: string,
    req_long: string,
    res_city: string,
    res_status: string,
    created_at: string
  ) {
    return this.dbClient.query(
      `INSERT INTO request_log(req_lat, req_long, res_city, res_status, created_at) VALUES ('${req_lat}','${req_long}' ,'${res_city}', '${res_status}', '${created_at}')`
    );
  }

  public async getAll() {
    return this.dbClient
      .query(`SELECT * FROM request_log`)
      .then((res) => res.rows);
  }
}
