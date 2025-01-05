const express = require("express");
const notesController = require("../controllers/notesController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

// Notes API Endpoints
router.get("/search", notesController.searchNotes);
router.get("/", notesController.getNotes);
router.get("/:id", notesController.getNoteById);
router.post("/", notesController.createNote);
router.put("/:id", notesController.updateNote);
router.delete("/:id", notesController.deleteNote);
router.post("/:id/share", notesController.shareNote);

module.exports = router;
