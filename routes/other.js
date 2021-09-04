const { Router } = require('express');
const router = Router();

const { errorHandler } = require('../middleware/error');

const postDao = require("../daos/post");
// const threadDao = require("../daos/thread");

// Text search
// - `GET /other/searchPosts`: It should carry out a text search and return the posts with the best text search score.
router.get("/searchPosts", async (req, res, next) => {
  try {
    // Make sure req.body has searchString as a field.
    const result = await postDao.postsTextSearch(req.body.searchString);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

// Sort
// - `GET /other/sortByNumber`: It should sort by number of posts in each thread with most number of posts on top.
// router.get("/sortByNumber", async (req, res, next) => {
// });

// Error handling middleware
router.use(errorHandler);

module.exports = router;
