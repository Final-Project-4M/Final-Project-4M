# 4M

4M is a MongoDB/Express API driven app that people can use to communicate with each other about a variety of different topics in specific niches.

The app allows users to create, update (edit), and delete their own posts as well as create and delete their own threads. Users without accounts can still view posts and threads but cannot create their own posts and/or threads.

This app will form  a key part of communication to users as it will be used to engage different groups of the same space together so they can discuss some topic or give  their opinion about something or provide useful information that can help another person or group and solve their problems, etc.

Team Members:
- Brian Cabacungan
- Karen Cabacungan
- Maboh Christopher
- Giorgio Suharianto

## How the project will meet assignment requirements

Features based around 4M will be as follows:

### Authentication and Authorization

4M will have a user creation and login system that will authenticate for use of the app and determine authorization for access to CRUD routes.

### CRUD Route 1: routes/login.js

Login will allow users, new or existing, to sign up (create) an account on 4M. They will be able to login using their credentials (email and password) as well as logout, which takes away their specific token and be able to change their password.

Signup
- `POST /login/signup`: uses bcrypt on the incoming password. Stores users with their email and encrypted password, handles conflicts when the email is already in use.
Login
- `POST /login`: finds the user with provided email. Uses bcrypt to compare stored passwords with the incoming password. If passwords match, generate a random token with uuid and return it to the user.
Logout
- `POST /login/logout`: if the user is logged in, invalidate their token so they can't use it again (remove it).
Change Password
- `POST /login/password`: if the user is logged in, store the incoming password using their userId.

### CRUD Route 2: routes/thread.js

Thread will allow users to create a thread on the forum (ex: sports thread, gaming thread, etc.) and store it on the forum application. A user will be able to get all the threads that they have started on 4M that correlates with their userId. They will also be able to get a specific thread that they have started using the threadId.

Create a Thread
- `POST /thread`: if the user is logged in, it should store the incoming thread along with their userId
Get All Threads
- `GET /thread`: if the user is logged in, it should get all threads for their userId
Get a Single Thread
- `GET /thread/:threadId`: if the user is logged in, it should get the single thread with the provided id and that has their userId

### CRUD Route 3: routes/post.js

Post will allow users to create a post within a thread on 4M. A thread will contain multiple posts from multiple users who are interested in posting on that thread. Post will allow users to edit only their own posts and delete their own posts according to that post's specific id (postId).

Create a Post
- `POST /post`: if the user is logged in, it should store the incoming post along with their userId
Update (edit) a Post
- `PUT /post/:postId`: if the user is logged in, and it is their post, they will have the ability to update their post
Delete a Post
- `DELETE /post/:postId`: if the user is logged in, and it is their post, they will have the ability to delete their post

### Text Search

Implementing a Text Search will allow the user to search for a word in 4M and all posts with that word will come out as a result

### Aggregations

The API will create aggregation lists for:
- Sort by number of posts (most # of posts to least # of posts)
- Sort by date created (creation of thread)
- Sort by date last updated (last post on a thread)

## Trello Progress

The final project tasks and progress will be tracked using Trello.
