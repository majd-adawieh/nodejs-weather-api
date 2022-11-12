import { client } from "./database/config";
import { PostgreDB } from "./database/database";
import { Server } from "./server";

const db = new PostgreDB(client);

const server = Server.getInstance(db).start();
