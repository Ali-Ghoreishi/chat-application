//! Only run this file for the first time

const pgtools = require("pgtools"); // create database in code

const path = require("path");


//* Load Config
require("dotenv").config({ path: "./config.env" });


//* Create Database
const createDB = async () => {
  await pgtools.createdb(
    `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432`,
    `${process.env.PGDATABASE}`,
    function (err, res) {
      if (err) {
        console.error(err);
        process.exit(-1);
      }
      console.log("Database Created.");
      // console.log(res);
    }
  );
};

createDB();
