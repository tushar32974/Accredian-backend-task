import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "Tushar10$",
  database: "accredian",
});

export default sequelize;
