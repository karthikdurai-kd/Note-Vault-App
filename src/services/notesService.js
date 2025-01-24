const Note = require("../models/noteModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// Create Note Service method
exports.create = async (userId, { title, content }) => {
  // Validate input
  if (!title || typeof title !== "string" || !title.trim()) {
    const error = new Error("Title is required and must be a non-empty string");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  if (!content || typeof content !== "string") {
    const error = new Error("Content is required and must be a string");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  // Create the note
  const note = new Note({
    title: title.trim(),
    content: content.trim(),
    owner: userId,
  });

  await note.save();
  return note;
};

// Fetch All Notes Service method
exports.getAll = async (userId) => {
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user ID ");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  // Fetch notes
  return Note.find({ owner: userId });
};

// Fetch Single Note By ID Service method
exports.getById = async (userId, noteId) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    const error = new Error("Invalid note ID");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  const note = await Note.findOne({ _id: noteId, owner: userId });
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404; // Not Found
    throw error;
  }

  return note;
};

// Update Note By ID Service method
exports.update = async (userId, noteId, { title, content }) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    const error = new Error("Invalid note ID");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  const note = await Note.findOneAndUpdate(
    { _id: noteId, owner: userId },
    { title, content },
    { new: true }
  );

  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404; // Not Found
    throw error;
  }

  return note;
};

// Delete Note By ID Service method
exports.delete = async (userId, noteId) => {
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    const error = new Error("Invalid note ID");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  const note = await Note.findOneAndDelete({ _id: noteId, owner: userId });
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404; // Not Found
    throw error;
  }
};

// Share Note Service method
exports.share = async (userId, noteId, sharedWith) => {
  // Validate input
  if (!Array.isArray(sharedWith)) {
    const error = new Error("'sharedWith' must be an array of user IDs");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  // Validate note ID format
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    const error = new Error("Invalid note ID");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  // Validate user IDs in sharedWith array
  const objectIds = [];
  for (const userId of sharedWith) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error = new Error(`Invalid user ID: ${userId}`);
      error.statusCode = 400; // Bad Request
      throw error;
    }
    objectIds.push(new mongoose.Types.ObjectId(userId));
  }

  // Check if the note exists and belongs to the user
  const note = await Note.findOne({ _id: noteId, owner: userId }).populate(
    "owner"
  );
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404; // Not Found
    throw error;
  }

  // Check if all user IDs exist in the database.
  const users = await User.find({ _id: { $in: objectIds } });
  if (users.length !== sharedWith.length) {
    const existingIds = users.map((user) => user._id.toString());
    const missingIds = objectIds.filter(
      (id) => !existingIds.includes(id.toString())
    );

    const error = new Error(
      `One or more users do not exist: ${missingIds.join(", ")}`
    );
    error.statusCode = 400; // Bad Request
    throw error;
  }

  // Update the note's sharedWith field
  note.sharedWith.push(...objectIds);
  await note.save();

  return note;
};

// Search Note by Keyword Service method
exports.search = async (userId, keyword) => {
  if (!keyword) {
    const error = new Error("Keyword is required");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  return Note.find({
    owner: userId,
    $text: { $search: keyword },
  }).select("title content");
};
