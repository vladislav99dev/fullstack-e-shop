const express = require("express");

const databaseConnect = require("./config/databaseConnect");
const { PORT, dbConnectionString } = require("./constants");

const app = express();

databaseConnect(dbConnectionString)
  .then((response) => {
    app.listen(PORT, () => {
      console.log(`App is connected to the cloud Database.`);
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
