const request = require("supertest");

const server = require("../server");
const testUtils = require("../test-utils");

const User = require('../models/user');
const Post = require('../models/post');

describe("/post", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    const post0 = { content: '123 Posts', userId: '123', threadId: '' };
    const post1 = { content: '456 Posts', userId: '456', threadId: '' };

    describe('Before login', () => {
        describe('POST /:postId', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).post("/post").send(post0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server).post("/post").set('Authorization', 'Bearer BAD').send(post0);
                expect(res.statusCode).toEqual(401);
            });
        });
        describe('PUT /:postId', () => {
            it('should send 401 without a token', async () => {
                const res = await request(server).put("/post").send(post0);
                expect(res.statusCode).toEqual(401);
            });
            it('should send 401 with a bad token', async () => {
                const res = await request(server).put("/post").set('Authorization', 'Bearer BAD').send();
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
        describe.each([post0, post1])("POST / post %#", (post) => {
            it('should send 403 to normal user and not store post', async () => {
                const res = await request(server).post("/post").set('Authorization', 'Bearer' + token0).send(post);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(post)
                const savedPost = await Post.findOne({ _id: res.body._id }).lean();
                expect(savedPost).toMatchObject(post);
            });
        });
        describe.each([post0, post1])("PUT / post %#", (post) => {
            let originalPost;
            beforeEach(async () => {
                const res = await request(server).post("/post").set('Authorization', 'Bearer' + adminToken).send(post);
                originalPost = res.body;
            });
            it('should send 403 to normal user and not update post', async () => {
                const res = await request(server).put("/post" + originalPost._id).set('Authorization', 'Bearer ' + token0).send({ ...content, threadId: content.threadId + 1 });
                expect(res.statusCode).toEqual(403);
                const newPost = await Post.findById(originalPost._id).lean();
                newPost._id = newPost._id.toString();
                expect(newPost).toMatchObject(originalPost);
            });
            it('should send 200 to admin user and update post', async () => {
                const res = await request(server).put("/post" + originalPost._id).set('Authorization', 'Bearer' + adminToken).send({ ...content, threadId: content.threadId + 1 });
                expect(res.statusCode).toEqual(200);
                const newPost = await Post.findById(originalPost._id).lean();
                newPost._id = newPost._id.toString();
                expect(newPost).toMatchObject({ ...originalPost, threadId: originalPost.threadId + 1 });
            });
        });
        describe.each([post0, post1])("DELETE /:postId post %#", (post) => {
            let originalPost;
            beforeEach(async () => {
                const res = await request(server).post("/post").set('Authorization', 'Bearer' + adminToken).send(post);
                originalPost = res.body;
            });
            it('should send 200 to normal user and delete post', async () => {
                const res = await request(server).delete("/post" + originalPost._id).set('Authorization', 'Bearer' + token0).send();
                expect(res.statusCode).toEqual(200);
                expect(res.body).toMatchObject(originalPost);
            });
        });
    });
});