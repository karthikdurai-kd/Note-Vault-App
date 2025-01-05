# **Speer Backend Assessment Project**

## **Overview**

Speer Backend Assessment Project provides secure, scalable APIs built using Node.js and Express. It enables users to create, manage, share, and search notes. Key features include user authentication, rate limiting, request throttling, and seamless integration with MongoDB for persistent data storage.

### **Key Features**

- **User Authentication**: Secure user sign-up and login with JWT-based authentication.
- **Note Management**: CRUD operations for notes, allowing users to create, update, delete, and retrieve notes.
- **Note Sharing**: Share notes with other users for collaborative efforts.
- **Search Notes**: Advanced keyword search functionality to find notes efficiently.
- **Rate Limiting & Throttling**: Prevents overloading by limiting requests to API endpoints and implementing throttling.

## **Tech Stack**

- **Backend**: `Node.js` with `Express.js`
- **Database**: `MongoDB` with `Mongoose ORM`
- **Authentication**: `JWT` (JSON Web Tokens)
- **Rate Limiting**: `express-rate-limit`
- **Request Throttling**: Custom throttle middleware
- **Password Hashing**: `bcrypt.js`
- **Environment Variables**: `dotenv` for secure management of secrets

### **Choice of Technologies**

- **Node.js with Express**: I chose Node.js with Express for building fast and scalable APIs. Node.js is non-blocking and asynchronous, making it suitable for handling numerous simultaneous connections. Express simplifies routing and middleware management, providing a lightweight framework for building RESTful APIs.

- **MongoDB**: I selected MongoDB, a NoSQL database, for its flexibility in storing unstructured data. MongoDB is ideal for projects with changing schemas and enables horizontal scaling.

- **JWT Authentication**: I used JWT (JSON Web Tokens) due to its stateless nature. JWT allows secure communication between the client and server without storing session information on the server side, making it scalable and efficient for managing user authentication.

- **bcrypt.js**: I used bcrypt.js for password hashing to ensure that user passwords are stored securely in the database. bcrypt provides a strong hashing mechanism with salt, adding an extra layer of security.

- **Supertest & Jest**: I chose Supertest and Jest for unit and integration testing. Jest is a powerful testing framework and Supertest simplifies HTTP calls to test the API endpoints.

## **Getting Started**

### **Prerequisites**

- Node.js (LTS version recommended)
- MongoDB instance (local or cloud via MongoDB Atlas)
- Postman or similar API testing tool (optional)

### **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/karthikdurai-kd/Speer-Backend-Assessment.git
   cd Speer-Backend-Assessment
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file at the root of the project with the following:

   ```plaintext
   JWT_SECRET=speer-backend
   MONGO_URI=mongodb://localhost:27017/speerDB
   MONGO_URI_TEST=mongodb://localhost:27017/speerTestDB
   PORT=5001

   ```

4. **Start the application**:
   ```bash
   npm start
   ```
   The server will be live at `http://localhost:5001`.

---

### **API Endpoints**

#### **Authentication API Endpoints**

- **POST /api/auth/signup**: Register a new user.

  - Request body:

  ```json
  {
    "username": "speer_user_1",
    "password": "Welcome@2025"
  }
  ```

  - Response: `201 Created` with user details.

- **POST /api/auth/login**: Log in and receive a JWT token.
  - Request body:
  ```json
  {
    "username": "speer_user_2",
    "password": "speer12#451"
  }
  ```
  - Response: `200 OK` with JWT token.

#### **Notes Management API End Points**

- **GET /api/notes**: Retrieve all notes of the authenticated user.

  - Response: `200 OK` with an array of notes.

- **GET /api/notes/:id**: Retrieve a specific note by ID.

  - Response: `200 OK` with note details.

- **POST /api/notes**: Create a new note.

  - Request body:

  ```json
  {
    "title": "Sample Note 1",
    "content": "Contents for Note 1 is written here"
  }
  ```

  - Response: `201 Created` with note details.

- **PUT /api/notes/:id**: Update a note by ID.

  - Request body:

  ```json
  {
    "title": "Sample Note 2",
    "content": "Contents for Note 2 is written here"
  }
  ```

  - Response: `200 OK` with updated note details.

- **DELETE /api/notes/:id**: Delete a specific note by ID.

  - Response: `204 No Content`.

- **POST /api/notes/:id/share**: Share a note with other users.

  - Request body:

  ```json
  {
    "sharedWith": ["userID1", "userID2"]
  }
  ```

  - Response: `200 OK` with updated note details.

- **GET /api/notes/search**: Search notes by keyword.
  - Query parameter: `keyword`
  - Response: `200 OK` with an array of matched notes.

---

### **Middleware**

- **Authentication Middleware**: Ensures routes are protected by requiring a valid JWT token.
- **Rate Limiting Middleware**: Restricts users to 100 requests per 15 minutes.
- **Throttle Middleware**: Implements request delays to prevent excessive API calls.

---

### **Error Handling**

The project includes global error handling via `errorHandler.js` middleware, ensuring all errors are caught and presented with consistent status codes and messages.

---

### **Testing**

Used **Jest** and **Supertest** for unit testing and integration testing to ensure the functionality and reliability of the API endpoints.

#### **Unit Tests**

##### **Key Unit Tests**:

- **Authentication Tests**: Verifies user registration and login functionality.

  - Tests if the correct user details are saved to the database after a sign-up.
  - Tests if the user could login with right credentials.

- **Note Management Tests**: Validates the functionality of CRUD operations on notes.
  - Tests that a note can be created, updated, and deleted correctly.
  - Verifies that the search functionality returns the correct notes based on the search keyword.

##### **How to Run Unit Tests**:

To run the unit tests, use the following command:

```bash
npm test
```

This will run all unit tests defined in the `tests` folder and display the results in the terminal.

#### **Integration Tests**

##### **Key Integration Tests**:

- **Authentication Integration**: Verifies the entire sign-up and login process, ensuring that JWT tokens are correctly issued and validated.

  - Ensures that the system correctly handles incorrect login credentials and signs up new users.
  - Tests the creation of a user and retrieval of the JWT token.

- **Note CRUD Integration**: Tests the integration of note creation, retrieval, updating, and deletion with the MongoDB database.
  - Verifies that a note is correctly stored in the MongoDB database when created.
  - Checks that notes can be updated and deleted successfully, and that changes are reflected in the database.

##### **How to Run Integration Tests**:

To run the integration tests, use the following command:

```bash
npm test
```

This will execute all integration tests using Jest and Supertest and display the results in the terminal.

<img width="642" alt="Screenshot 2025-01-04 at 10 40 03 PM" src="https://github.com/user-attachments/assets/721e2339-8922-4194-b17f-79cdf9031897" />

---

### **Folder Structure**

<img width="370" alt="Screenshot 2025-01-04 at 10 45 15 PM" src="https://github.com/user-attachments/assets/fee2a000-8cfd-40b7-89c2-900777f3b134" />

---

### **Security Best Practices**

- **Password Hashing**: All user passwords are hashed using `bcrypt.js`.
- **JWT Authentication**: Secure JWT tokens are used to authenticate and authorize users.
- **Secure Headers**: Security headers are managed with the `helmet` middleware.
- **Environment Variables**: Sensitive information like the JWT secret and MongoDB URI are stored securely in `.env`.

# API Documentation

You can explore the API documentation using Swagger UI [here](https://speer-backend-assessment.onrender.com/api-docs/).

Alternatively, you can import the Postman collection using [this link](https://github.com/karthikdurai-kd/Speer-Backend-Assessment/blob/main/docs/Speer-Backend-Assessment-Notes-API-Collection%20Production.postman_collection.json).
