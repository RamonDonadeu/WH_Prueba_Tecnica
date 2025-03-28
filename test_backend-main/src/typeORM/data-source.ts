import { DataSource } from "typeorm";
import { User } from "./schema.typeORM.js";

export const DatabaseConnection = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
}); 