const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const User = require("../../models/userModel");
const Note = require("../../models/userModel");

describe("Notes Routes Integration Tests", () => {
  let token;
  let testUser;

  beforeAll(async () => {
    // Connecting to database
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Before each test, setting up a user and log them in to get the token
  beforeEach(async () => {
    // Create a test user
    testUser = new User({ username: "testuser", password: "password123" });
    await testUser.save();

    // Log in to get the JWT token
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    token = loginResponse.body.token;
  });

  // Clean up after all tests
  afterEach(async () => {
    await Note.deleteMany({});
  });

  afterAll(async () => {
    // Cleanup database and close the connection after tests
    await mongoose.connection.close();
  });

  // Create Note Test
  test("Create a Note", async () => {
    const noteData = { title: "Test Note", content: "This is a test note" };

    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send(noteData);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(noteData.title);
    expect(response.body.content).toBe(noteData.content);
  });

  // Fetch All Note Test
  test("Get all Notes", async () => {
    await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test note" });

    const response = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Fetch Note by ID Test
  test("Get Note by ID", async () => {
    const createdNote = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test note" });

    const noteId = createdNote.body._id;

    const response = await request(app)
      .get(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(noteId);
  });

  // Update Note Test
  test("Update a Note", async () => {
    const createdNote = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test note" });

    const noteId = createdNote.body._id;
    const updatedData = {
      title: "Updated Test Note",
      content: "Updated content",
    };

    const response = await request(app)
      .put(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.content).toBe(updatedData.content);
  });

  // Delete Note Test
  test("Delete a Note", async () => {
    const createdNote = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test note" });

    const noteId = createdNote.body._id;

    const response = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  // Share Note Test
  test("Share a Note", async () => {
    const createdNote = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test note" });

    const noteId = createdNote.body._id;
    const sharedWith = [testUser._id]; // Share with the same user

    const response = await request(app)
      .post(`/api/notes/${noteId}/share`)
      .set("Authorization", `Bearer ${token}`)
      .send({ sharedWith });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Note shared successfully");
  });

  // Search Note Test
  test("Search Notes", async () => {
    await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Note",
        content: "This is a test note about testing",
      });

    const response = await request(app)
      .get("/api/notes/search?keyword=test")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
