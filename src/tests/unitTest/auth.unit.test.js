const authController = require("../../controllers/authController");
const authService = require("../../services/authService");

jest.mock("../../services/authService");

describe("Auth Controller", () => {
  describe("Signup", () => {
    it("should create a user and return status 201", async () => {
      const req = {
        body: { username: "testuser", password: "testpassword" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      authService.registerUser.mockResolvedValue({
        id: "123",
        username: "testuser",
      });

      await authController.signup(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: "123",
        username: "testuser",
      });
    });

    it("should return an error if user already exists", async () => {
      const req = {
        body: { username: "existinguser", password: "password" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      authService.registerUser.mockRejectedValue(
        new Error("User already exists")
      );

      await authController.signup(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("User already exists"));
    });
  });

  describe("Login", () => {
    it("should login the user and return a token", async () => {
      const req = {
        body: { username: "testuser", password: "testpassword" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      authService.loginUser.mockResolvedValue("some-jwt-token");

      await authController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: "some-jwt-token" });
    });

    it("should return an error if credentials are invalid", async () => {
      const req = {
        body: { username: "invaliduser", password: "wrongpassword" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      authService.loginUser.mockRejectedValue(new Error("Invalid credentials"));

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Invalid credentials"));
    });
  });
});
