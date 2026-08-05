const request = require("supertest");
const app = require("../server");

describe("Authentication API", () => {
    const user = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "member",
    };

    test("should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(user);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("User registered successfully.");
        expect(res.body).toHaveProperty("token");
        expect(res.body.user.email).toBe(user.email);
    });

    test("should not register duplicate user", async () => {
        await request(app)
            .post("/api/auth/register")
            .send(user);

        const res = await request(app)
            .post("/api/auth/register")
            .send(user);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("User already exists.");
    });

    test("should login successfully", async () => {
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Login User",
                email: "login@test.com",
                password: "password123",
                role: "member",
            });

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "login@test.com",
                password: "password123",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Login successful.");
        expect(res.body).toHaveProperty("token");
    });

    test("should reject invalid password", async () => {
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Wrong Password User",
                email: "wrong@test.com",
                password: "password123",
                role: "member",
            });

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "wrong@test.com",
                password: "incorrect",
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe("Invalid credentials.");
    });
});