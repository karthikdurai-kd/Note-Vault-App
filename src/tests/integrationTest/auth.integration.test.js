const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const User = require("../../models/userModel");

describe("Auth Routes", () => {
  let userToken;

  beforeAll(async () => {
    // Connecting to the database
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Cleanup database and close the connection after tests
    await mongoose.connection.close();
  });

  // Test user signup
  test("should signup a new user", async () => {
    const signupData = {
      username: "testuser1",
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
  test("should login an existing user", async () => {
    const loginData = {
      username: "testuser1",
      password: "testpassword",
    };

    const response = await request(app).post("/api/auth/login").send(loginData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    userToken = response.body.token;
  });

  // Test login with invalid credentials
  test("should return error for invalid login credentials", async () => {
    const loginData = {
      username: "testuser1",
      password: "wrongpassword",
    };

    const response = await request(app).post("/api/auth/login").send(loginData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });
});
