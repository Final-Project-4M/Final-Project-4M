const { Router } = require("express");
// const bcrypt = require('bcrypt');
const router = Router();

const userDAO = require('../daos/user');
const tokenDAO = require('../daos/token');

router.get("/", (req, res, next) => {
  res.send('<p>Hello!</p>');
});

// Signup: POST /login/signup - Uses bcrypt on the incoming password.
// Stores users with their email and encrypted password, handles conflicts
// when the email is already in use
// router.post("/signup", async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!password || !email) {
//     res.status(400).send('Missing signup info');
//   } else if (email === '' || password === '') {
//     res.status(400).send('Both email and password cannot be empty');
//   } else {
//     try {
//       const user = await userDAO.getUser(email);
//       if (user) {
//         res.status(409).send('Email already signed up');
//       } else {
//         const encryptedPassword = await bcrypt.hash(password, 10);
//         const userInfo = ({ email, password: encryptedPassword });
//         const savedUser = await userDAO.createUser(userInfo);
//         res.json(savedUser);
//       }
//     } catch (e) {
//       next(e);
//     }
//   }
// });


// // Login: POST /login - Finds the user with the provided email.
// // Users bcrypt to compare stored passwords with the incoming password.
// // If passwords match, generate a random token with uuid and return it to user.
// router.post("/", async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || email === '') {
//     res.status(401).send('Email missing');
//   } else {
//     try {
//       const user = await userDAO.getUser(email);
//       if (!user) {
//         res.status(401).send('User not found');
//       } else {
//         if (!password || password === '') {
//           res.status(400).send('Password missing');
//         } else {
//           bcrypt.compare(password, user.password, async (error, result) => {
//             if (error || !result) {
//               res.status(401).send('Password Incorrect');
//             } else {
//               const token = await tokenDAO.getTokenForUserId(user._id);
//               res.status(200).send(token);
//             }
//           });
//         }
//       }
//     } catch (e) {
//       next(e);
//     }
//   }
// });

// // Logout: POST /login/logout - If the user is logged in, invalidate
// // their token so they can't use it again (remove it).
// router.post("/logout", isAuthenticated, async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const removed = tokenDAO.removeToken(token);
//     res.status(200).send(removed);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

// // Change password POST /login/password - If the user is logged in, store
// // the incoming password using their userId.
// // Change Password POST /login/password
// router.post("/password", isAuthenticated, async (req, res, next) => {
//   const password = req.body.password;
//   if (!password || password === '') {
//     res.status(400).send('New password required');
//   } else {
//     try {
//       const encryptedPassword = await bcrypt.hash(password, 10);
//       const success = await userDAO.changeUserPassword(req.userId, encryptedPassword);
//       res.sendStatus(success ? 200 : 400);
//     } catch (e) {
//       res.status(500).send(e.message);
//     }
//   }
// });

module.exports = router;