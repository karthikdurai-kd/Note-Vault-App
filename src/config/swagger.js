const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Speer Backend Assessment Project APIs",
      version: "1.0.0",
      description: "API for managing and searching notes",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/`,
      },
    ],
  },
  // Path to the API specs
  apis: ["./src/controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
