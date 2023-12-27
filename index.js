const express = require("express");
const env = require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// mongodb Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@clothingbranddb.crpccgp.mongodb.net/`
  )
  .then(() => {
    console.log("Database is connected");
  });

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
