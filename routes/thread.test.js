const request = require("supertest");

const server = require("../server");
const testUtils = require("../test-utils");

const User = require('../models/user');
const Thread = require("../models/thread");

describe("/thread", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    const thread0 = { posts: '123 Posts', title: 'Thread One', userId: '123' };
    const thread1 = { posts: '456 Posts', title: 'Thread Two', userId: '456' };

    describe('Before login', () => {
        describe('POST /', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).post("/thread").send(thread0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server)
                    .post("/thread")
                    .set('Authorization', 'Bearer BAD')
                    .send(thread0);
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('GET /', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).get("/thread").send(thread0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server)
                    .get("/thread")
                    .set('Authorization', 'Bearer BAD')
                    .send();
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('GET /myThreads', () => {
        });
        describe('GET /:threadId', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).get("/thread/123").send(thread0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server)
                    .get("/thread/456")
                    .set('Authorization', 'Bearer BAD')
                    .send();
                expect(res.statusCode).toEqual(401);
            });
        });
    });
    describe('after login', () => {
        const user0 = {
            email: 'user0@mail.com',
            password: '123password'
        };
        const user1 = {
            email: 'user1@mail.com',
            password: '456password'
        }
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
        describe.each([thread0, thread1])("POST / thread %#", (thread) => {
            it('should send 403 to normal user and not store thread', async () => {
                const res = await request(server)
                    .post("/thread")
                    .set('Authorization', 'Bearer ' + token0)
                    .send(thread);
                expect(res.statusCode).toEqual(403);
                expect(await Thread.countDocuments()).toEqual(0);
            });
            it('should send 200 to admin user and store thread', async () => {
                const res = await request(server)
                    .post("/thread")
                    .set('Authorization', 'Bearer ' + adminToken)
                    .send(thread);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(thread)
                const savedThread = await Thread.findOne({ _id: res.body._id }).lean();
                expect(savedThread).toMatchObject(thread);
            });
        });
        describe.each([item0, item1])("GET /:threadId thread %#", (thread) => {
            let originalThread;
            beforeEach(async () => {
                const res = await request(server)
                    .post("/thread")
                    .set('Authorization', 'Bearer ' + adminToken)
                    .send(thread);
                originalThread = res.body;
            });
            it('should send 200 to normal user and return thread', async () => {
                const res = await request(server)
                    .get("/thread/" + originalThread._id)
                    .set('Authorization', 'Bearer ' + token0)
                    .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(originalThread);
            });
            it('should send 200 to admin user and return thread', async () => {
                const res = await request(server)
                    .get("/thread/" + originalThread._id)
                    .set('Authorization', 'Bearer ' + adminToken)
                    .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(originalThread);
            });
        });
        describe("GET /", () => {
            let threads;
            beforeEach(async () => {
                threads = (await Thread.insertMany([thread0, thread1])).map(i => i.toJSON())
                threads.forEach(i => i._id = i._id.toString());
            });
            it('should send 200 to normal user and return all threads', async () => {
                const res = await request(server)
                    .get("/thread/")
                    .set('Authorization', 'Bearer ' + token0)
                    .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(thread);
            });
            it('should send 200 to admin user and return all threads', async () => {
                const res = await request(server)
                    .get("/thread/")
                    .set('Authorization', 'Bearer ' + adminToken)
                    .send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(thread);
            });
        });
        /* describe("GET /myThreads", () => {
            let threads;
            beforeEach(async () => {
              threads = (await Thread.insertMany([thread0, thread1])).map(i => i.toJSON())
              threads.forEach(i => i._id = i._id.toString());
            });
            it('should send 200 to normal user and return all threads', async () => {
              const res = await request(server)
                .get("/thread/")
                .set('Authorization', 'Bearer ' + token0)
                .send();
              expect(res.statusCode).toEqual(200);
              expect(res.body).toMatchObject(thread);
            });
            it('should send 200 to admin user and return all threads', async () => {
              const res = await request(server)
                .get("/thread/")
                .set('Authorization', 'Bearer ' + adminToken)
                .send();
              expect(res.statusCode).toEqual(200);
              expect(res.body).toMatchObject(thread);
            });
        }); */
    });
});