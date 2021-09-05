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
});