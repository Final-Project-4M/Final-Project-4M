const request = require("supertest");
const jwt = require('jsonwebtoken');

const server = require("../server");
const testUtils = require('../test-utils');

const User = require('../models/user');
const { idText, isExportDeclaration } = require("typescript");

describe("/login", () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    const user = {
        email: 'user@email.com',
        password: 'userpassword'
    };

    describe("before signup", () => {
        describe("POST /", () => {
            it("should return 401", async () => {
                const res = await request(server).post("/login").send(user);
                expect(res.statusCode).toEqual(401);
            });
        });

        
    })
})