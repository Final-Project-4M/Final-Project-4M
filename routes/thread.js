const { Router } = require('express');
const router = Router();

const threadDao = require('../daos/thread');
require('dotenv').config();

// Create a thread
// - `POST /thread`: If the user is logged in, it should store the incoming thread along with their userId.
router.post("/", async (req, res, next) => {
  try {
    const threadObj = req.body;
    const createdThread = await threadDao.createThread(threadObj);
    res.json(createdThread);
  } catch (e) {
    next(e);
  }
});

// Get all threads
// - `GET /thread`: It should get all threads in the database.
router.get("/", async (req, res, next) => {
  try {
    const allThreads = await threadDao.getThreads();
    res.json(allThreads);
  } catch (e) {
    next(e);
  }
});

