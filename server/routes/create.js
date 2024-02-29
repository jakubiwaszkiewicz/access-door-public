// importing express framework
const express = require("express");

// importing router to export endpoints to diff files
const router = express.Router();

// importing ORM (Prisma)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// importing middleware
const authenticateToken = require("../middleware/authenticateToken");

router.post("/labourer", authenticateToken, async (request, response) => {
  // Get all data about the user which is adding the new labourer
  const { email, password } = request.user;
  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  // Check if the user is an administrator
  if (!labourer.isAdmin) return response.sendStatus(403);

  // Get all data about the new labourer from the request body

  if (request.body.password.length < 8) return response.sendStatus(403);
  if (!request.body.email.includes("@") && !request.body.email.includes(".")) {
    return response.sendStatus(403);
  }

  // Check if the new labourer already exists
  const existingLabourer = await prisma.labourer.findUnique({
    where: {
      email: request.body.email,
    },
  });
  if (existingLabourer) {
    console.log("This email is already taken.");
    return response.status(400).json({ error: "This email is taken." });
  }

  const addLabourer = await prisma.labourer.create({
    data: {
      name: request.body.name,
      surname: request.body.surname,
      email: request.body.email,
      password: request.body.password,
      isAdmin: false,
      isOwner: false,
    },
  });
  addLabourer;
  response.sendStatus(200);
});

router.post("/door", authenticateToken, async (request, response) => {
  // Get all data about the user which is adding the new labourer
  const { email, password } = request.user;
  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  // Check if the user is an administrator
  if (!labourer.isAdmin)
    return response
      .status(403)
      .json({ error: "You are not an administrator." });

  // Check if the new labourer already exists
  const existingDoor = await prisma.door.findUnique({
    where: {
      name: request.body.name,
    },
  });

  if (existingDoor) {
    return response.sendStatus(400);
  }

  const addDoor = await prisma.door.create({
    data: {
      name: request.body.name,
      description: request.body.description,
    },
  });

  addDoor;
  response.sendStatus(200);
});

router.post("/access", authenticateToken, async (request, response) => {
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

  let labourer = await prisma.labourer.findUnique({
    where: {
      email: request.body.email,
    },
  });

  let door = await prisma.door.findUnique({
    where: {
      name: request.body.name,
    },
  });

  if (!labourer.id)
    return response.status(400).json({ error: "Labourer not found." });
  if (!door.id) return response.status(400).json({ error: "Door not found." });

  console.log(`Labourer ID: ${labourer.id}`);
  console.log(`Door ID: ${door.id}`);

  // Check if the new access already exists
  let isAccessExists = await prisma.access.findMany({
    where: {
      labourerID: parseInt(labourer.id),
      doorID: parseInt(door.id),
    },
  });

  console.log(isAccessExists[0]);

  if (isAccessExists[0] != undefined) {
    return response.status(400).json({ error: "Access already exists." });
  }

  try {
    const createAccess = await prisma.access.create({
      data: {
        labourer: {
          connect: {
            id: labourer.id,
          },
        },
        door: {
          connect: {
            id: door.id,
          },
        },
      },
    });

    const createLog = await prisma.accessAddedByLog.create({
      data: {
        access: {
          connect: {
            id: parseInt(createAccess.id),
          },
        },
        admin: {
          connect: {
            id: user.id, // admin.id because we "user" is an admin
          },
        },
        door: {
          connect: {
            id: door.id,
          },
        },
      },
    });
    createAccess;
    createLog;
  } catch {
    return response.status(400).json({ error: "Error occcured." });
  }
  response.sendStatus(200);
});

router.post("/open", authenticateToken, async (request, response) => {
  // Get all data about the user which is adding the new labourer
  const { email, password } = request.user;

  const labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  const door = await prisma.door.findUnique({
    where: {
      name: request.body.name,
    },
  });

  // Check if door is existing
  if (door === null) {
    return response.status(400).json({ error: "Door not found." });
  }

  // Check if the user is an administrator
  if (labourer.isAdmin) {
    const createDoorOpenedLog = await prisma.doorOpenedLog.create({
      data: {
        labourer: {
          connect: {
            id: labourer.id,
          },
        },
        door: {
          connect: {
            id: door.id,
          },
        },
      },
    });
    createDoorOpenedLog;
    return response.sendStatus(200);
  }

  // checking if user has access to the door
  const hasAccess = await prisma.access.findMany({
    where: {
      labourerID: labourer.id,
      doorID: door.id,
    },
  });

  if (hasAccess === null) {
    return response.status(400).json({ error: "Access denied." });
  }

  const createDoorOpenedLog = await prisma.doorOpenedLog.create({
    data: {
      labourer: {
        connect: {
          id: labourer.id,
        },
      },
      door: {
        connect: {
          id: door.id,
        },
      },
    },
  });
  createDoorOpenedLog;
  response.sendStatus(200);
});

module.exports = router;
