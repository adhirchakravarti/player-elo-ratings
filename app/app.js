const express = require("express");
const app = express();
const port = 3000;
const service = require("./match-service");

app.use(express.json());
app.use((req, res, next) => {
  // Make sure any origin can make requests
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/matches", (req, res) => res.send(service.list()));
app.post("/matches", (req, res) => {
  service.add(req.body);
  res.status(201).send({ msg: "match added!" });
});

app.listen(port, () =>
  console.log(`Scopely frontend challenge server running in port ${port}`)
);
