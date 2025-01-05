const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

beforeAll(async () => {
  // Connect to a test database or use in-memory database like MongoMemoryServer
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Cleanup database and close the connection after tests
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  let userToken;

  // Test user signup
  it("should signup a new user", async () => {
    const signupData = {
      username: "testuser3",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/api/auth/signup")
      .send(signupData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("username", signupData.username);
    expect(response.body).toHaveProperty("id");
  });

  // Test login
  it("should login an existing user", async () => {
    const loginData = {
      username: "testuser3",
      password: "testpassword",
    };

    const response = await request(app).post("/api/auth/login").send(loginData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    userToken = response.body.token;
  });

  // Test login with invalid credentials
  it("should return error for invalid login credentials", async () => {
    const loginData = {
      username: "testuser3",
      password: "wrongpassword",
    };

    const response = await request(app).post("/api/auth/login").send(loginData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });
});
