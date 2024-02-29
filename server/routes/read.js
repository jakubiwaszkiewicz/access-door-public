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

// LABOURERS ENDPOINTS
//
//
// Endpoint to get all labourers only by administrators
router.get("/labourers", authenticateToken, async (request, response) => {
  // Get all data about the user
  const { email, password } = request.user;
  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });
  // Check if the user is an administrator
  if (!labourer.isAdmin) return response.sendStatus(403);

  const labourers = await prisma.labourer.findMany();

  response.json(labourers);
});

// Endpoint to get a labourer by only himself
router.get("/labourer", authenticateToken, async (request, response) => {
  // Get all data about the user
  const { email, password } = request.user;
  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });
  response.json(labourer);
});

router.get("/doors", authenticateToken, async (request, response) => {
  // Get all data about the doors
  const email = request.user.email;
  const password = request.user.password;
  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  if (!labourer.isAdmin) return response.sendStatus(403);

  const doors = await prisma.door.findMany({});

  response.json(doors);
});
// Endpoint to get accesses with door names
router.get("/access", authenticateToken, async (request, response) => {
  // Get all data about the user
  const { email, password } = request.user;
  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  // You may want to check if the labourer exists before proceeding
  if (!labourer) {
    return response.status(404).json({ error: "Labourer not found." });
  }

  const accesses = await prisma.access.findMany({
    where: {
      // If you want to filter accesses for non-admin users, uncomment this line:
      // ...(labourer.isAdmin ? {} : { labourerID: labourer.id }),
    },
    include: {
      door: true, // Include the related door data for each access
    },
  });

  // Transform the accesses to include door names
  // This step is only necessary if you want to reshape the data
  const accessesWithDoorNames = accesses.map(access => ({
    ...access,
    doorName: access.door.name // Assumes that 'door' is included and not null
  }));

  response.json(accessesWithDoorNames);
});
// Endpoint to get accesses by labourers and administrators (administrators has access to everydoor)
router.get("/access", authenticateToken, async (request, response) => {
  // Get all data about the user
  const email = request.user.email;
  const password = request.user.password;
  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  const accesses = await prisma.access.findMany({});


  response.json(accesses);
});

// Endpoint to get all accesses only by administrators
router.get("/accesses", authenticateToken, async (request, response) => {
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

  const accesses = await prisma.access.findMany({});

  response.json(accesses);
});

// Endpoint to get all administrators by only owner
router.get("/administrators", authenticateToken, async (request, response) => {
  // Get all data about the user
  const email = request.user.email;
  const password = request.user.password;
  let labourer = await prisma.labourer.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  if (!labourer.isOwner) return response.sendStatus(403);

  let administrators = prisma.labourer.findMany({
    where: {
      isAdmin: true,
    },
  });
  response.json(administrators);
});

// Endpoint to get all notifications by only administrators
router.get("/notifications", authenticateToken, async (request, response) => {
  // Get all data about the user
  const email = request.user.email;
  const password = request.user.password;
  let labourer = labourers.filter(
    (labourer) => email === labourer.email && password === labourer.password
  )[0];

  if (!labourer.isAdmin) return response.sendStatus(403);

  notifications.forEach((notification) => {
    let labourer = labourers.filter(
      (labourer) => labourer.id === notification.labourerID
    )[0];
    notification.labourer = labourer;
    let door = doors.filter((door) => door.id === notification.doorID)[0];
    notification.door = door;
  });
  response.json(notifications);
});

// Endpoint to get all doors by only administrators
router.get("/doors", authenticateToken, (request, response) => {
  // Get all data about the user
  const email = request.user.email;
  const password = request.user.password;
  let labourer = labourers.filter(
    (labourer) => email === labourer.email && password === labourer.password
  )[0];

  if (!labourer.isAdmin) return response.sendStatus(403);
  
  response.json(doors);
});

module.exports = router;
