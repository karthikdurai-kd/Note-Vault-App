const authService = require("../services/authService");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API Endpoints
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Create a new user in the system with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *                 example: speer_user_1
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *                 example: password@2025
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created user.
 *                   example: 60b8d295cb2f3f001f2d3a56
 *                 username:
 *                   type: string
 *                   description: The username of the newly created user.
 *                   example: speer_user_1
 *       400:
 *         description: Invalid data or missing fields in the request body.
 *       409:
 *         description: User already exists.
 *       500:
 *         description: Internal server error.
 */
exports.signup = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user and get JWT token
 *     description: Authenticate the user and return a JWT token for authentication in future requests.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: speer_user_1
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: password@2025
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for authenticated user.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBiOGQyOTVjYjJmM2YwMDFmMmQzYTU2IiwiaWF0IjoxNjI5ODk1MjAwfQ.V-X_GogfMUn9z3LJfFuP6eW9u9AkpA"
 *       400:
 *         description: Missing or invalid parameters.
 *       401:
 *         description: Invalid credentials (username or password incorrect).
 *       500:
 *         description: Internal server error.
 */
exports.login = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
