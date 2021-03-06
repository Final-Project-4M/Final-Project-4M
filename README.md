# 4M

## Final Evaluation

### Final Project Update as of 5 September 2021

Submitted both repositories for backend and frontend.

#### Link to our deployed backend APIs

https://floating-reef-51161.herokuapp.com/

#### What We Learned

We started with weekly meetings to work together but we quickly learned that having these weekly meetings to work on the project together was inefficient given the remote nature of the team. Our form of communication, Slack, was an essential part on getting tasks done as we were able to tell the team what we're working on and receive feedback when possible. Although we had a Trello board up for project management, we found ourselves relying heavily on Slack because it was easier to talk to each other when picking up a task, making requests of others, and finding problems within our project.

We also learned that connecting our backend to our frontend was challenging. We knew that our backend worked with verification from using Postman, but a lot of our challenges came from having to connect the backend to the frontend. Some of the times, we were unsure of the reason why, but we were able to work together and solve the problems to the best of our abilities.

#### What We Would Like To Do Differently/Improve Upon

We definitely would like to fine-tune our user and admin roles. We focused mostly on the user end as that is what we thought was best to focus on while working on this project in terms of presentation. We would like to have written more routes in regards to the admin role in this application. We also would like to improve our database and implement more thorough content that can be shown in the frontend for users viewing our application.

#### Final Thoughts

As a team, we believe our project is a useful project that anyone can use. We think we effectively fulfilled the requirements of the project and created a MongoDB/Express API driven app with Express.JS backend that can extended and fine-tuned should we choose to expand the application.

## Proof of Concept

### Project Update as of 22 August 2021

#### Completed

Here's what's been completed:
- Invited team members to Trello board.
- Divided Project Proposal tasks into two teams: Trello Tasks (Brian and Karen) and README (Giorgio and Maboh).
- Completed a working and updated Trello board for project progress and updated README.
- Completed a deploying app with Heroku.
- Divided Proof of Concept tasks into two teams: Deployment (Giorgio and Maboh) and README (Brian and Karen).
- Set up our project starter code files.
- Created our project MongoDB Atlas cluster.
- Set up and deployed our project to Heroku.

#### In Review

Here's what's ready for review:
- All models files are In Review and soon to be moved into Completed.
- All daos files are In Review and soon to be moved into Completed.

#### In Progress

Here's what's currently in progress:
- We are currently setting up CI and CD. We need to connect Heroku to GitHub for CD and configure the settings. We also need to work on workflows files to start CI.
- We are finishing up our Authentication and Authorization route (routes/login.js) and getting it ready for review.

#### This Sprint

Here's what's next in the sprint:
- For our next sprint, we will be working on CRUD Route 1: routes/thread.js.

#### Backlog

Here's what's in our backlog:
- Write CRUD Route 2: routes/post.js.
- Write CRUD Route 3: routes/other.js.
- Write middleware/... files.
- Set up and create a working UI in the front-end.

Project progress is still being tracked on Trello. As the project progresses, tasks are updated frequently and moved into In Progress, In Review, or Completed.

### How to access API

The link to our deployed app: https://floating-reef-51161.herokuapp.com/

We set up our database cluster in MongoDB Atlas. At the moment, we have three users registered in our database. For proof of concept,
we are demonstrating that our backend can interact with our database in MongoDB Atlas by getting the user informations. You can sign up for 4M through Postman by using the URL https://floating-reef-51161.herokuapp.com/login/signup and entering your email and password in the request body.

## About 4M

4M is a MongoDB/Express API driven app that people can use to communicate with each other about a variety of different topics in specific niches.

The app allows users to view posts in the forum about any topics there are. They can also create, update (edit), and delete their own posts as well as create and delete their own threads. Users without accounts can still view posts and threads but cannot create their own posts and/or threads.

This app will form a key part of communication to users as it will be used to engage different groups of the same space together so they can discuss some topic or give their opinion about something or provide useful information that can help another person or group and solve their problems, etc.

Team Members:
- Brian Cabacungan
- Karen Cabacungan
- Maboh Christopher
- Giorgio Timothy Suharianto

## How the project will meet assignment requirements

Features based around 4M will be as follows:
- Users can view posts in any threads (logged in or not logged in).
- Users can create an account with 4M.
- Users can create a new thread within 4M (logged in).
- Users can submit posts into any threads within 4M (logged in).
- Users can delete any threads they created (logged in).
- Users can edit or delete any posts they posted (logged in).
- Users can look for posts by searching a word or a phrase (logged in or not logged in).
- Users can sort by number of posts in each thread with most number of posts on top.

### Authentication and Authorization: routes/login.js

4M will have a user creation and login system that will authenticate for use of the app and determine authorization for access to CRUD routes. Users who are not logged in can only view posts within the threads in 4M. Login will allow users, new or existing, to sign up (create) an account with 4M. They will be able to login using their credentials (email and password) as well as logout, which takes away their specific token and be able to change their password.

Signup
- `POST /login/signup`: Uses bcrypt on the incoming password. Stores users with their email and encrypted password, handles conflicts when the email is already in use.

Login
- `POST /login`: Finds the user with provided email. Uses bcrypt to compare stored passwords with the incoming password. If passwords match, generate a random token with uuid and return it to the user.

Logout
- `POST /login/logout`: If the user is logged in, invalidate their token so they can't use it again (remove it).

Change password
- `POST /login/password`: If the user is logged in, store the incoming password using their userId.

### CRUD Route 1: routes/thread.js

Thread will allow users to create a thread on the forum (ex: sports thread, gaming thread, etc.) and store it on the forum application. A user will be able to get all the threads that they have started on 4M that correlates with their userId. They will also be able to get a specific thread that they have started using the threadId.

Create a thread
- `POST /thread`: If the user is logged in, it should store the incoming thread along with their userId.

Get all threads
- `GET /thread`: It should get all threads in the database.

Get my threads
- `GET /thread/myThreads`: It should get all threads which were created by this user.

Get a single thread
- `GET /thread/:threadId`: If the user is logged in, it should get the single thread with the provided id and that has their userId

### CRUD Route 2: routes/post.js

Post will allow users to create a post within a thread on 4M. A thread will contain multiple posts from multiple users who are interested in posting on that thread. Post will allow users to edit only their own posts and delete their own posts according to that post's specific id (postId).

Create a post
- `POST /post/:threadId`: If the user is logged in, it should store the incoming post along with their userId.

Update (edit) a post
- `PUT /post/:postId`: If the user is logged in, and it is their post, they will have the ability to update their post.

Delete a post
- `DELETE /post/:postId`: If the user is logged in, and it is their post, they will have the ability to delete their post.

### CRUD Route 3: routes/other.js

Here are the routes which are responsible for the text search and aggregation features.

Text search
- `GET /other/searchPosts`: It should carry out a text search and return the posts with the best text search score.

Sort
- `GET /other/sortByNumber`: It should sort by number of posts in each thread with most number of posts on top.

### Indexes and uniqueness

Every users' email must be unique. Each user has an unique email and userId. If a user tries to create an account with an existing email, the app will not allow it. Implement indexes on thread type to increase efficiency.

### Text Search

Implementing a text search will allow users to search for a word or a phrase within all posts, posts with the greatest score from the search will be shown on top.

### Aggregations

The API will use aggregation for:
- Sort by number of posts in each thread (most number of posts on top)

## Trello Progress

The final project tasks and progress will be tracked using Trello.
