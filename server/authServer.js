require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware
// this allows us to access the request body as a json object
app.use(express.json());
app.use(cors());

const { generateAccessToken } = require("./utility.js");

app.post("/api/login", async (request, response) => {
  // User Authentication
  const password = request.body.password;
  const email = request.body.email;

  // Check if the user exists

  const labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });
  if (!labourer) return response.sendStatus(401);

  const user = { password: password, email: email };
  const accessToken = generateAccessToken(user);
  response.json({ accessToken: accessToken });
});

app.listen(4000);
