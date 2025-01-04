const notesController = require("../../controllers/notesController");
const notesService = require("../../services/notesService");
jest.mock("../../services/notesService");

describe("Notes Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: "user123" },
      params: {},
      body: {},
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe("Create Note", () => {
    it("should create a note and return status 201", async () => {
      req.body = { title: "Note Title", content: "Note Content" };

      notesService.create.mockResolvedValue({
        title: "Note Title",
        content: "Note Content",
        owner: req.user.id,
      });

      await notesController.createNote(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        title: "Note Title",
        content: "Note Content",
        owner: req.user.id,
      });
    });
  });

  describe("Get Notes", () => {
    it("should return a list of notes", async () => {
      const notes = [
        { title: "Note 1", content: "Content 1", owner: req.user.id },
        { title: "Note 2", content: "Content 2", owner: req.user.id },
      ];
      notesService.getAll.mockResolvedValue(notes);

      await notesController.getNotes(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(notes);
    });

    it("should handle error if no notes found", async () => {
      notesService.getAll.mockResolvedValue([]);

      await notesController.getNotes(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe("Get Note by ID", () => {
    it("should return a specific note", async () => {
      req.params.id = "note123";
      const note = {
        title: "Note Title",
        content: "Note Content",
        owner: req.user.id,
      };
      notesService.getById.mockResolvedValue(note);

      await notesController.getNoteById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(note);
    });

    it("should handle error if note is not found", async () => {
      req.params.id = "note123";
      notesService.getById.mockRejectedValue(new Error("Note not found"));

      await notesController.getNoteById(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Note not found"));
    });
  });

  describe("Search Notes", () => {
    it("should return search results", async () => {
      req.query.keyword = "search";
      const results = [{ title: "Search Note", content: "Content" }];
      notesService.search.mockResolvedValue(results);

      await notesController.searchNotes(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: results,
      });
    });

    it("should return an error if no keyword is provided", async () => {
      req.query.keyword = "";

      await notesController.searchNotes(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Search query cannot be empty.",
      });
    });
  });
});
