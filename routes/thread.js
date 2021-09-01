const { Router } = require('express');
const router = Router();

const { isAuthorized } = require('../middleware/auth');
const { errorHandler } = require('../middleware/error');

const threadDao = require('../daos/thread');
// const postDao = require('../daos/post');

// Create a thread
// - `POST /thread`: If the user is logged in, it should store the incoming thread along with their userId.
router.post("/", isAuthorized, async (req, res, next) => {
  try {
    const { userId, title } = req.body;
    const threadObject = {
      posts: [],
      title: title,
      userId: userId
    };
    const threadCreated = await threadDao.createThread(threadObject);
    res.json(threadCreated);
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

// Get my threads
// - `GET /thread/myThreads`: It should get all threads which were created by this user.
router.get("/myThreads", isAuthorized, async (req, res, next) => {
  try {
    const userThreads = await threadDao.getThreadByUser(req.userInfo._id);
    res.json(userThreads);
  } catch (e) {
    next(e);
  }
});

// Get a single thread
// - `GET /thread/:threadId`: If the user is logged in, it should get the single thread with the provided id and that has their userId
router.get("/:threadId", isAuthorized, async (req, res, next) => {
  try {
    const thisThread = await threadDao.getThreadById(req.params.threadId);
    if (req.userInfo._id == thisThread.userId) {
      res.json(thisThread);
    } else {
      res.status(404).send('User does not own this thread');
    }
  } catch (e) {
    next(e);
  }
});

// Error handling middleware
router.use(errorHandler);

module.exports = router;
