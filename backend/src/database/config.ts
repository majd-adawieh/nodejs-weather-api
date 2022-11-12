import { Client } from "pg";

export const client = new Client({
  host: "localhost",
  database: "test_db",
  user: "admin",
  password: "mypassword",
  port: 5432,
});
