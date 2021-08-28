const { Router } = require('express');
const router = Router();

const { isAuthorized } = require('../middleware/auth');
const { errorHandler } = require('../middleware/error');

const threadDao = require('../daos/thread');
const postDao = require('../daos/post');

// Create a post
// - `POST /post/:threadId`: If the user is logged in, it should store the incoming post along with their userId.
router.post("/:threadId", isAuthorized, async (req, res, next) => {
  try {
    // Make sure that the req body from frontend has a content field.
    const postObject = {
      content: req.body.content,
      userId: req.userInfo._id,
      threadId: req.params.threadId
    }
    const createdPost = await postDao.createPost(postObject);
    res.json(createdPost);
  } catch (e) {
    next(e);
  }
});

// Update (edit) a post
// - `PUT /post/:postId`: If the user is logged in, and it is their post, they will have the ability to update their post.
router.put("/:postId", isAuthorized, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const thisPost = await postDao.getOnePost(postId);
    if (thisPost.userId == req.userInfo._id) {
      const updatedPostObj = {
        content: req.body.content,
        userId: req.userInfo._id
      }
      const updated = await postDao.updatePost(postId, updatedPostObj);
      if (updated) {
        res.sendStatus(200);
      }
    } else {
      res.status(400).send("User does not own this post");
    }
  } catch (e) {
    next(e);
  }
});

// Delete a post
// - `DELETE /post/:postId`: If the user is logged in, and it is their post, they will have the ability to delete their post.
router.delete("/:postId", isAuthorized, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const thisPost = await postDao.getOnePost(postId);
    if (thisPost.userId == req.userInfo._id) {

    } else {
      res.status(400).send("User does not own this post");
    }

  } catch (e) {

  }
});

// Error handling middleware
router.use(errorHandler);

module.exports = router;
