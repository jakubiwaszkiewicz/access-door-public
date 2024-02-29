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

router.put("/privileges/add", authenticateToken, async (request, response) => {
  const email = request.user.email;
  const password = request.user.password;

  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  if (!labourer.isOwner) return response.sendStatus(403);

  if (!request.body.email) {
    return response.status(400).json({ error: "Email is required." });
  }

  const existingLabourer = await prisma.labourer.findUnique({
    where: {
      email: request.body.email,
    },
  });

  if (!existingLabourer) {
    return response.status(404).json({ error: "Labourer not found." });
  }

  if (existingLabourer.isAdmin) {
    return response
      .status(400)
      .json({ error: "Labourer is already an admin." });
  }

  const updatePrivileges = await prisma.labourer.upsert({
    where: {
      email: request.body.email,
    },
    update: {
      isAdmin: true,
    },
    create: {
      name: existingLabourer.name,
      surname: existingLabourer.surname,
      email: existingLabourer.email,
      password: existingLabourer.password,
      isAdmin: true,
      isOwner: existingLabourer.isOwner,
    },
  });
  updatePrivileges;
  response.sendStatus(200);
});

router.put(
  "/privileges/delete",
  authenticateToken,
  async (request, response) => {
    const email = request.user.email;
    const password = request.user.password;

    let labourer = await prisma.labourer.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (!labourer.isOwner) return response.sendStatus(403);

    if (!request.body.email) {
      return response.status(400).json({ error: "Email is required." });
    }

    const existingLabourer = await prisma.labourer.findUnique({
      where: {
        email: request.body.email,
      },
    });

    if (!existingLabourer) {
      return response.status(404).json({ error: "Labourer not found." });
    }

    if (!existingLabourer.isAdmin) {
      return response.status(400).json({ error: "Labourer isn't an admin." });
    }

    const updatePrivileges = await prisma.labourer.upsert({
      where: {
        email: request.body.email,
      },
      update: {
        isAdmin: false,
      },
      create: {
        name: existingLabourer.name,
        surname: existingLabourer.surname,
        email: existingLabourer.email,
        password: existingLabourer.password,
        isAdmin: true,
        isOwner: existingLabourer.isOwner,
      },
    });
    updatePrivileges;
    response.sendStatus(200);
  }
);

router.put(
  "/privileges/transfer",
  authenticateToken,
  async (request, response) => {
    const email = request.user.email;
    const password = request.user.password;

    let labourer = await prisma.labourer.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (!labourer.isOwner) return response.sendStatus(403);

    if (!request.body.email) {
      return response.status(400).json({ error: "Email is required." });
    }

    const existingLabourer = await prisma.labourer.findUnique({
      where: {
        email: request.body.email,
      },
    });

    if (!existingLabourer) {
      return response.status(404).json({ error: "Labourer not found." });
    }

    if (!existingLabourer.isAdmin) {
      return response.status(400).json({ error: "Labourer isn't an admin." });
    }

    const deleteOwnerPrivileges = await prisma.labourer.upsert({
      where: {
        email: email,
      },
      update: {
        isOwner: false,
      },
      create: {
        name: existingLabourer.name,
        surname: existingLabourer.surname,
        email: existingLabourer.email,
        password: existingLabourer.password,
        isAdmin: existingLabourer.isAdmin,
        isOwner: false,
      },
    });

    const addOwnerPrivileges = await prisma.labourer.upsert({
      where: {
        email: request.body.email,
      },
      update: {
        isOwner: true,
      },
      create: {
        name: existingLabourer.name,
        surname: existingLabourer.surname,
        email: existingLabourer.email,
        password: existingLabourer.password,
        isAdmin: existingLabourer.isAdmin,
        isOwner: true,
      },
    });

    addOwnerPrivileges;
    deleteOwnerPrivileges;

    response.sendStatus(200);
  }
);

module.exports = router;
