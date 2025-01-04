// /tests/unit/authController.test.js

const authController = require("../../controllers/authController");
const authService = require("../../services/authService");

// Mocking dependencies
jest.mock("../../services/authService");

describe("Auth Controller - Unit Tests", () => {
  it("should register a user", async () => {
    const req = {
      body: { username: "testuser", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the service method
    authService.registerUser.mockResolvedValue({ username: "testuser" });

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ username: "testuser" });
  });

  it("should login a user and return a JWT", async () => {
    const req = {
      body: { username: "testuser", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the service method
    authService.loginUser.mockResolvedValue({ token: "fake_jwt_token" });

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "fake_jwt_token" });
  });
});
