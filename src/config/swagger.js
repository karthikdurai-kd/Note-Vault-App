const swaggerJSDoc = require("swagger-jsdoc");

// Swagger Setup with Authorzation token option
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description:
        "Speer Backend Assessment Project APIs for managing and searching notes",
    },
    components: {
      schemas: {
        Note: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the note",
              example: "63e2f1c4b7b50f5d6c123456",
            },
            title: {
              type: "string",
              description: "Title of the note",
              example: "Meeting Notes",
            },
            content: {
              type: "string",
              description: "Content of the note",
              example: "Discussion about project timelines and milestones.",
            },
            owner: {
              type: "string",
              description: "The ID of the user who created the note",
              example: "63e2f1c4b7b50f5d6c654321",
            },
            sharedWith: {
              type: "array",
              items: {
                type: "string",
                description: "The ID of a user with whom the note is shared",
              },
              description: "List of user IDs the note is shared with",
              example: ["63e2f1c4b7b50f5d6c789012", "63e2f1c4b7b50f5d6c987654"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the note was created",
              example: "2025-01-05T12:34:56.789Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the note was last updated",
              example: "2025-01-06T15:21:45.123Z",
            },
          },
          required: ["title", "content", "owner"],
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the user",
              example: "63e2f1c4b7b50f5d6c123456",
            },
            username: {
              type: "string",
              description: "The username of the user",
              example: "Speer_Sample_User_1",
            },
            password: {
              type: "string",
              description:
                "The password of the user which is hashed in the database",
              example:
                "$2b$10$C8xHqQF9bPlO.ZzOlyEUZOzAOKk7QSn6JeQZB74HyYsKrDhOG98O2",
            },
          },
          required: ["username", "password"],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/controllers/*.js"], // Path to the API controller
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
