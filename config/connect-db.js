const { Sequelize } = require("sequelize");
const path = require("path");

//* Load Config
require("dotenv").config({ path: "./config.env" });

//* Connect to Database
const sequelize = new Sequelize(
  `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432/${process.env.PGDATABASE}` , {
    logging: false       // disable logging; default: console.log
  }
);
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

connectDB();

module.exports = sequelize;
