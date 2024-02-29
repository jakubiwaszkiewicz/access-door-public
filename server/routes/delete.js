// importing express framework
const express = require("express");
const app = express();

// importing router to export endpoints to diff files
const router = express.Router();

// importing ORM (Prisma)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// importing middleware
const authenticateToken = require("../middleware/authenticateToken");

router.delete("/labourer", authenticateToken, async (request, response) => {
  // Get all data about the user
  const email = request.user.email;
  const password = request.user.password;
  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  if (!labourer.isAdmin) return response.sendStatus(403);

  if (!request.body.email) {
    return response
      .status(400)
      .json({ error: "Email is required for deletion." });
  }

  const existingLabourer = await prisma.labourer.findUnique({
    where: {
      email: request.body.email,
    },
  });

  if (!existingLabourer) {
    return response.status(404).json({ error: "Labourer not found." });
  }
  const deleteLabourer = await prisma.labourer.delete({
    where: {
      email: request.body.email,
    },
  });
  deleteLabourer;
  response.sendStatus(200);
});

router.delete("/door", authenticateToken, async (request, response) => {
  // Get all data about the user
  const email = request.user.email;
  const password = request.user.password;
  const doorName = request.body.name;
  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });
  if (!labourer.isAdmin)
    return response
      .status(403)
      .json({ error: "You are not an administrator." });

  if (!doorName) {
    return response
      .status(400)
      .json({ error: "Name is required for deletion." });
  }

  const door = await prisma.door.findUnique({
    where: {
      name: doorName,
    },
  });

  if (!door) {
    return response.status(404).json({ error: "Door not found." });
  }

  const deleteDoorOpenedLog = await prisma.doorOpenedLog.deleteMany({
    where: {
      doorId: door.id,
    },
  });
  const deleteAccessAddedByLog = await prisma.accessAddedByLog.deleteMany({
    where: {
      doorId: door.id,
    },
  });
  const deleteAccess = await prisma.access.deleteMany({
    where: {
      doorID: door.id,
    },
  });
  const deleteDoor = await prisma.door.deleteMany({
    where: {
      name: doorName,
    },
  });

  deleteDoorOpenedLog;
  deleteAccessAddedByLog;
  deleteAccess;
  deleteDoor;
  try {
  } catch {
    return response.status(400).json({ error: "Something went wrong." });
  }
  response.sendStatus(200);
});

router.delete("/access", authenticateToken, async (request, response) => {
  // Get all data about the user which is adding the new labourer
  const { email, password } = request.user;
  let user = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  // Check if the user is an administrator
  if (!user.isAdmin)
    return response
      .status(403)
      .json({ error: "You are not an administrator." });

  const labourer = await prisma.labourer.findUnique({
    where: {
      email: request.body.email,
    },
  });
  const door = await prisma.door.findUnique({
    where: {
      name: request.body.name,
    },
  });

  const doorID = door.id;
  const labourerID = labourer.id;

  if (!labourerID)
    return response.status(400).json({ error: "Labourer not found." });
  if (!doorID) return response.status(400).json({ error: "Door not found." });

  // Check if the new access not exists
  let isAccessExists = await prisma.access.findMany({
    where: {
      labourerID: labourerID,
      doorID: doorID,
    },
  });

  isAccessExists = isAccessExists[0];

  if (!isAccessExists) {
    return response.status(400).json({ error: "Access not exists." });
  }
  console.log(isAccessExists.id);
  isAccessExists.id = parseInt(isAccessExists.id);

  try {
    const deleteLogs = await prisma.accessAddedByLog.deleteMany({
      where: {
        accessID: isAccessExists.id,
      },
    });

    const deleteAccess = await prisma.access.deleteMany({
      where: {
        id: isAccessExists.id,
      },
    });
    deleteLogs;
    deleteAccess;
  } catch {
    return response.status(400).json({ error: "Something went wrong." });
  }

  response.sendStatus(200);
});

module.exports = router;
