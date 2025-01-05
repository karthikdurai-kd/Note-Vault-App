const Note = require("../models/noteModel");

// Create Note Service method
exports.create = async (userId, { title, content }) => {
  const note = new Note({
    title,
    content,
    owner: userId,
  });

  await note.save();
  return note;
};

// Fetch All Notes Service method
exports.getAll = async (userId) => {
  return Note.find({ owner: userId });
};

// Fetch Single Note By ID Service method
exports.getById = async (userId, noteId) => {
  const note = await Note.findOne({ _id: noteId, owner: userId });
  if (!note) throw new Error("Note not found");
  return note;
};

// Update Note By ID Service method
exports.update = async (userId, noteId, { title, content }) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, owner: userId },
    { title, content },
    { new: true }
  );
  if (!note) throw new Error("Note not found");
  return note;
};

// Delete Note by ID Service method
exports.delete = async (userId, noteId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, owner: userId });
  if (!note) throw new Error("Note not found");
};

// Share Note Service method
exports.share = async (userId, noteId, sharedWith) => {
  const note = await Note.findOne({ _id: noteId, owner: userId });
  if (!note) throw new Error("Note not found");

  note.sharedWith.push(...sharedWith);
  await note.save();

  return note;
};

// Search Note by Keyword Service method
exports.search = async (userId, keyword) => {
  if (!keyword) {
    throw new Error("Keyword is required");
  }

  return Note.find({
    owner: userId,
    $text: { $search: keyword },
  }).select("title content");
};
