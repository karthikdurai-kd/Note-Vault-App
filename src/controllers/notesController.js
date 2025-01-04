const notesService = require("../services/notesService");
const Note = require("../models/noteModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.createNote = async (req, res, next) => {
  try {
    const note = await notesService.create(req.user.id, req.body);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

exports.getNotes = async (req, res, next) => {
  try {
    const notes = await notesService.getAll(req.user.id);
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

exports.getNoteById = async (req, res, next) => {
  try {
    const note = await notesService.getById(req.user.id, req.params.id);
    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const note = await notesService.update(
      req.user.id,
      req.params.id,
      req.body
    );
    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    await notesService.delete(req.user.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.shareNote = async (req, res) => {
  try {
    const noteId = req.params.id; // Extract note ID from route params
    const { sharedWith } = req.body; // Extract sharedWith users from request body

    // Ensure sharedWith is an array
    if (!Array.isArray(sharedWith)) {
      return res.status(400).json({
        success: false,
        message: "'sharedWith' must be an array of user IDs",
      });
    }

    // Validate and convert user IDs to ObjectId
    const objectIds = [];
    for (const userId of sharedWith) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: `Invalid user ID: ${userId}`,
        });
      }
      objectIds.push(new mongoose.Types.ObjectId(userId));
    }

    // Find the note by ID and populate the user field
    const note = await Note.findById(noteId).populate("owner");
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Ensure that the note has a user field populated
    if (!note.owner || !note.owner._id) {
      return res.status(400).json({
        success: false,
        message:
          "The note must be associated with a valid owner who created it.",
      });
    }

    // Ensure that the note belongs to the authenticated user
    if (note.owner._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to share this note",
      });
    }

    // Check that the users in sharedWith exist
    const users = await User.find({ _id: { $in: objectIds } });
    if (users.length !== sharedWith.length) {
      const existingIds = users.map((user) => user._id.toString());
      const missingIds = objectIds.filter(
        (id) => !existingIds.includes(id.toString())
      );

      return res.status(400).json({
        success: false,
        message: `One or more users do not exist: ${missingIds.join(", ")}`,
      });
    }

    // Add shared users to the note
    note.sharedWith.push(...objectIds);

    // Save the updated note
    await note.save();

    res.status(200).json({
      success: true,
      message: "Note shared successfully",
      note,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.searchNotes = async (req, res, next) => {
  try {
    const query = req.query.keyword; // Get the search keyword from the request
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query cannot be empty.",
      });
    }

    // Pass the query to the service to perform the search
    const results = await notesService.search(req.user.id, query);

    // If no notes found with the keyword
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No notes found with the keyword ${query}`,
      });
    }

    // Return the filtered results
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    next(err);
  }
};
