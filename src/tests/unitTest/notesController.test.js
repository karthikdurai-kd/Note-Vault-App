// /tests/unit/notesController.test.js

const notesController = require("../../controllers/notesController");
const notesService = require("../../services/notesService");

// Mocking dependencies
jest.mock("../../services/notesService");

describe("Notes Controller - Unit Tests", () => {
  it("should create a note", async () => {
    const req = {
      body: { title: "Test Note", content: "Content of the note" },
      user: { id: "userId" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the service method
    notesService.create.mockResolvedValue({
      title: "Test Note",
      content: "Content of the note",
      user: "userId",
    });

    await notesController.createNote(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      title: "Test Note",
      content: "Content of the note",
      user: "userId",
    });
  });

  it("should fetch notes for a user", async () => {
    const req = {
      user: { id: "userId" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the service method
    notesService.getAll.mockResolvedValue([{ title: "Test Note" }]);

    await notesController.getNotes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ title: "Test Note" }]);
  });
});
