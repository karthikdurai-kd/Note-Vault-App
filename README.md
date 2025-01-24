# **Note Vault App**

### **Overview**

Note Vault App provides secure, scalable APIs built using Node.js and Express. It enables users to create, manage, share, and search notes. Key features include user authentication, rate limiting, request throttling, and seamless integration with MongoDB for persistent data storage.

---

### **Architecture Diagram**

<img width="870" alt="Screenshot 2025-01-05 at 7 55 20 PM" src="https://github.com/user-attachments/assets/3d196566-8736-434e-ac2d-1e338cc4db4f" />

---

### **Key Components**

1. **Client**

   - Acts as the entry point for users to interact with the backend services.
   - Sends API requests for authentication, note management, sharing, and search functionalities.
   - Receives JWT tokens for authentication and relevant responses for actions.

2. **Rate Limiting Middleware**

   - Protects the server from overuse by restricting excessive API requests.

3. **Throttling Middleware**

   - Introduces delay in processing requests when an excessive load is detected.

4. **Authentication Layer**

   - Handles secure user login and sign-up operations.
   - Stores user credentials securely in the database after hashing with `bcrypt.js`.

5. **CRUD Operations Layer**

   - Provides APIs to create, read, update, and delete notes.
   - Handles database interactions for storing and retrieving notes.

6. **Note Sharing**

   - Allows users to share notes with others by updating shared user information.
   - Provides APIs to manage shared notes effectively.

7. **Search Notes**

   - Implements efficient search functionalities to find notes based on user queries.
   - Returns relevant results based on search criteria.

8. **MongoDB**
   - Database for storaging user credentials, notes, and sharing details.

---

### **Features**

- **User Authentication**: Secure user sign-up and login with JWT-based authentication.
- **Note Management**: CRUD operations for notes, allowing users to create, update, delete, and retrieve notes.
- **Note Sharing**: Share notes with other users for collaborative efforts.
- **Search Notes**: Advanced keyword search functionality to find notes efficiently.
- **Rate Limiting & Throttling**: Prevents overloading by limiting requests to API endpoints and implementing throttling.

---

### **Tech Stack**

| **Category**         | **Technology**          |
| -------------------- | ----------------------- |
| **Backend**          | Node.js with Express.js |
| **Database**         | MongoDB with Mongoose   |
| **Authentication**   | JWT                     |
| **Password Hashing** | bcrypt.js               |
| **Middleware**       | express-rate-limit      |
| **Environment**      | dotenv                  |
| **Testing**          | Jest, Supertest         |

---

### **Choice of Technologies**

- **Node.js with Express**: I chose Node.js with Express for building fast and scalable APIs. Node.js is non-blocking and asynchronous, making it suitable for handling numerous simultaneous connections. Express simplifies routing and middleware management, providing a lightweight framework for building RESTful APIs.

- **MongoDB**: I selected MongoDB, a NoSQL database, for its flexibility in storing unstructured data. MongoDB is ideal for projects with changing schemas and enables horizontal scaling.

- **JWT Authentication**: I used JWT (JSON Web Tokens) due to its stateless nature. JWT allows secure communication between the client and server without storing session information on the server side, making it scalable and efficient for managing user authentication.

- **bcrypt.js**: I used bcrypt.js for password hashing to ensure that user passwords are stored securely in the database. bcrypt provides a strong hashing mechanism with salt, adding an extra layer of security.

- **Supertest & Jest**: I chose Supertest and Jest for unit and integration testing. Jest is a powerful testing framework and Supertest simplifies HTTP calls to test the API endpoints.

---

### **Getting Started**

### **Prerequisites**

- Node.js (LTS version recommended)
- MongoDB instance (local or cloud via MongoDB Atlas)
- Postman or similar API testing tool (optional)

### **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/karthikdurai-kd/Note-Vault-App.git
   cd Note-Vault-App
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file at the root of the project with the following:

   ```plaintext
   JWT_SECRET=your-secret-key
   MONGO_URI=mongodb://localhost:27017/noteVaultDB
   MONGO_URI_TEST=mongodb://localhost:27017/noteVaultTestDB
   PORT=5001

   ```

4. **Start the application**:
   ```bash
   npm start
   ```
   The server will be live at `http://localhost:5001`.

---

### **Deployment Details**

1. **Hosting Platform**:

   - Note Vault App Project APIs are deployed on **Render**.

2. **Deployment URL**:

   - The live backend API can be accessed at: **[https://note-vault-app.onrender.com](https://note-vault-app.onrender.com)**

3. **API Documentation**:

   - API documentation is available through Swagger UI.
   - **Swagger UI URL**: **[https://note-vault-app.onrender.com/api-docs/](https://note-vault-app.onrender.com/api-docs/)**

4. **Postman Collection**:
   - **[Download Postman Collection](https://github.com/karthikdurai-kd/Speer-Backend-Assessment/blob/main/postman_collection/Speer-Backend-Assessment-Notes-API-Collection%20Production.postman_collection.json)**

---

### **API Endpoints**

#### **Authentication API Endpoints**

- **POST /api/auth/signup**: Register a new user.

  - Request body:

  ```json
  {
    "username": "user_1",
    "password": "Welcome@2025"
  }
  ```

  - Response: `201 Created` with user details.

- **POST /api/auth/login**: Log in and receive a JWT token.
  - Request body:
  ```json
  {
    "username": "user_2",
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

### **Security Best Practices**

- **Password Hashing**: All user passwords are hashed using `bcrypt.js`.
- **JWT Authentication**: Secure JWT tokens are used to authenticate and authorize users.
- **Secure Headers**: Security headers are managed with the `helmet` middleware.
- **Environment Variables**: Sensitive information like the JWT secret and MongoDB URI are stored securely in `.env`.

---

### **Explore the APIs**

- **API Documentation**: [Swagger UI](https://note-vault-app.onrender.com/api-docs/)
- **Postman Collection**: [Download Here](https://github.com/karthikdurai-kd/Speer-Backend-Assessment/blob/main/postman_collection/Speer-Backend-Assessment-Notes-API-Collection%20Production.postman_collection.json)
