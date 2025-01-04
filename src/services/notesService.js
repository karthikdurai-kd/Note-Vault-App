const Note = require("../models/noteModel");

exports.create = async (userId, { title, content }) => {
  const note = new Note({
    title,
    content,
    owner: userId,
  });

  await note.save();
  return note;
};

exports.getAll = async (userId) => {
  return Note.find({ owner: userId });
};

exports.getById = async (userId, noteId) => {
  const note = await Note.findOne({ _id: noteId, owner: userId });
  if (!note) throw new Error("Note not found");
  return note;
};

exports.update = async (userId, noteId, { title, content }) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, owner: userId },
    { title, content },
    { new: true }
  );
  if (!note) throw new Error("Note not found");
  return note;
};

exports.delete = async (userId, noteId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, owner: userId });
  if (!note) throw new Error("Note not found");
};

exports.share = async (userId, noteId, sharedWith) => {
  const note = await Note.findOne({ _id: noteId, owner: userId });
  if (!note) throw new Error("Note not found");

  note.sharedWith.push(...sharedWith);
  await note.save();

  return note;
};

exports.search = async (userId, keyword) => {
  if (!keyword) {
    throw new Error("Keyword is required");
  }

  return Note.find({
    owner: userId,
    $text: { $search: keyword },
  }).select("title content");
};
