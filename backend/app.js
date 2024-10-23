import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/drivers", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const fileContent = await fs.readFile("./data/drivers.json");

  const driversData = JSON.parse(fileContent);

  res.status(200).json({ drivers: driversData });
});

app.get("/vehicles", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const fileContent = await fs.readFile("./data/vehicles.json");

  const vehiclesData = JSON.parse(fileContent);

  res.status(200).json({ vehicles: vehiclesData });
});

app.get("/records", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const fileContent = await fs.readFile("./data/records.json");

  const recordsData = JSON.parse(fileContent);

  res.status(200).json({ records: recordsData });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
