// allowing import proccess.env variables
require("dotenv").config();
const cors = require("cors");

// Konfiguracja CORS, aby zezwolić tylko na żądania z określonej domeny
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// importing express framework
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// this allows us to access the request body as a json object
app.use(express.json());
app.use(cors(corsOptions));

// importing routes from diff files
const readRoutes = require("./routes/read");
app.use("/api/read", readRoutes);
const createRoutes = require("./routes/create");
app.use("/api/create", createRoutes);
const deleteRoutes = require("./routes/delete");
app.use("/api/delete", deleteRoutes);
const updateRoutes = require("./routes/update");
app.use("/api/update", updateRoutes);

app.listen(PORT);
