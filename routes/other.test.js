const request = require("supertest");

const server = require("../server");
const testUtils = require("../test-utils");

const User = require('../models/user');
const Post = require('../models/post');
const Thread = require('../models/thread');

describe("/", async () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    // Getting text search by posts
    const post0 = { posts: '123 Posts', title: 'Post One', userId: '123' };
    const post1 = { posts: '456 Posts', title: 'Post Two', userId: '456' };
    const thread0 = { posts: '123 Posts', title: 'Thread One', userId: '123' };
    const thread1 = { posts: '123 Posts', title: 'Thread Two', userId: '456' };

    describe('Before login', () => {
        describe('POST /', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).post("/post").send(post0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server).post("/post").set('Authorization', 'Bearer BAD').send(post0);
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('GET /', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).get("/post").send(post0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server).get("/post").set('Authorization', 'Bearer BAD').send();
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('GET /myPosts', () => {
        });
        describe('GET /:postId', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).get("/post/123").send(post0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server).get("/post/456").set('Authorization', 'Bearer BAD').send();
                expect(res.statusCode).toEqual(401);
            });
        });
    });

    describe('After login', () => {
        const user0 = {
            email: 'user0@mail.com',
            password: '123password'
        };
        const user1 = {
            email: 'user1@mail.com',
            password: '456password'
        };
        
        let token0;
        let adminToken;
        beforeEach(async () => {
            await request(server).post("/login/signup").send(user0);
            const res0 = await request(server).post("/login").send(user0);
            token0 = res0.body.token;
            await request(server).post("/login/signup").send(user1);
            await User.updateOne({ email: user1.email }, { $push: { roles: 'admin' } });
            const res1 = await request(server).post("/login").send(user1);
            adminToken = res1.body.token;
        });
        describe.each([post0, post1])("GET /:postId post %#", (post) => {
            let originalPost;
            beforeEach(async () => {
                const res = await request(server).post("/post").set('Authorization', 'Bearer' + adminToken).send(post);
                originalPost = res.body;
            });
            it('should send 200 to normal user and return search post', async () => {
                const res = await request(server).get("/thread/" + originalPost._id).set('Authorization', 'Bearer' + token0).send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(originalPost);
            });
            it('should send 200 to admin user and return search post', async () => {
                const res = await request(server).get("/thread/" + originalPost._id).set('Authorization', 'Bearer' + adminToken).send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(originalThread);
            });
        });
    });

    // Getting text search by thread
    describe('Before login', () => {
        describe('POST /', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).post("/thread").send(thread0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server).post("/thread").set('Authorization', 'Bearer BAD').send(post0);
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('GET /', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).get("/thread").send(thread0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server).get("/thread").set('Authorization', 'Bearer BAD').send();
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('GET /myThread', () => {
        });
        describe('GET /:threadId', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).get("/thread/123").send(thread0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server).get("/thread/456").set('Authorization', 'Bearer BAD').send();
                expect(res.statusCode).toEqual(401);
            });
        });
    });

    describe('After login', () => {
        const user0 = {
            email: 'user0@mail.com',
            password: '123password'
        };
        const user1 = {
            email: 'user1@mail.com',
            password: '456password'
        };

        let token0;
        let adminToken;
        beforeEach(async () => {
            await request(server).post("/login/signup").send(user0);
            const res0 = await request(server).post("/login").send(user0);
            token0 = res0.body.token;
            await request(server).post("/login/signup").send(user1);
            await User.updateOne({ email: user1.mail }, { $push: { roles: 'admin' } });
            const res1 = await request(server).post("/login").send(user1);
            adminToken - res1.body.token;
        });
        describe.each([thread0, thread1])("GET /:threadId thread %#", (thread) => {
            let originalThread;
            beforeEach(async () => {
                const res = await request(server).post("/post").set('Authorization', 'Bearer' + adminToken).send(post);
                originalThread = res.body;
            });
            it('should send 200 to normal user and return search thread', async () => {
                const res = await request(server).get("/thread/" + originalThread._id).set('Authorization', 'Bearer' + token0).send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(originalThread);
            });
            it('should send 200 to admin user and return search thread', async () => {
                const res = await request(server).get("/thread" + originalThread._id).set('Authorization', 'Bearer' + adminToken).send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(originalThread);
            });
        });
    });
});