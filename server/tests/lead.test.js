const request = require("supertest");
const app = require("../server");

describe("Lead API", () => {
    let token;

    beforeEach(async () => {
        const registerRes = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Lead Test User",
                email: "leadtest@example.com",
                password: "password123",
                role: "admin",
            });

        token = registerRes.body.token;
    });

    test("should reject access to protected route without token", async () => {
        const res = await request(app).get("/api/leads");

        expect(res.statusCode).toBe(401);
    });

    test("should create a new lead", async () => {
        const res = await request(app)
            .post("/api/leads")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Rahul Sharma",
                email: "rahul@test.com",
                phone: "9876543210",
                company: "Infosys",
                status: "New",
                source: "LinkedIn",
                notes: "Interested in enterprise plan.",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Lead created successfully.");
        expect(res.body.lead.name).toBe("Rahul Sharma");
        expect(res.body.lead.email).toBe("rahul@test.com");
    });
});