const notesService = require("../services/notesService");
const Note = require("../models/noteModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes API Endpoints
 */

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     description: Create a new note for the authenticated user.
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My First Note"
 *               content:
 *                 type: string
 *                 example: "This is the content of the note."
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
exports.createNote = async (req, res, next) => {
  try {
    const note = await notesService.create(req.user.id, req.body);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     description: Retrieve all notes for the authenticated user.
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       500:
 *         description: Internal server error
 */
exports.getNotes = async (req, res, next) => {
  try {
    const notes = await notesService.getAll(req.user.id);
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get a single note by ID
 *     description: Retrieve a note by its ID for the authenticated user.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the note to retrieve.
 *         schema:
 *           type: string
 *           example: "60c72b2f5f1b2b0015f8d3a2"
 *     responses:
 *       200:
 *         description: The note details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
exports.getNoteById = async (req, res, next) => {
  try {
    const note = await notesService.getById(req.user.id, req.params.id);
    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note by ID
 *     description: Update the content of an existing note by its ID.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the note to update.
 *         schema:
 *           type: string
 *           example: "60c72b2f5f1b2b0015f8d3a2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Note Title"
 *               content:
 *                 type: string
 *                 example: "Updated content of the note."
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     description: Delete an existing note by its ID.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the note to delete.
 *         schema:
 *           type: string
 *           example: "60c72b2f5f1b2b0015f8d3a2"
 *     responses:
 *       204:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
exports.deleteNote = async (req, res, next) => {
  try {
    await notesService.delete(req.user.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/notes/{id}/share:
 *   post:
 *     summary: Share a note with other users
 *     description: Share a note with one or more users by providing their user IDs.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the note to share.
 *         schema:
 *           type: string
 *           example: "60c72b2f5f1b2b0015f8d3a2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sharedWith:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60c72b2f5f1b2b0015f8d3a3"
 *     responses:
 *       200:
 *         description: Note shared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Note shared successfully"
 *                 note:
 *                   $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input data
 *       403:
 *         description: You are not authorized to share this note
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/notes/search:
 *   get:
 *     summary: Search for notes by keyword
 *     description: Search for notes containing the provided keyword in the title or content.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         description: The keyword to search for in the notes.
 *         schema:
 *           type: string
 *           example: "meeting"
 *     responses:
 *       200:
 *         description: A list of notes that match the search keyword
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *       400:
 *         description: Search query cannot be empty
 *       404:
 *         description: No notes found with the provided keyword
 *       500:
 *         description: Internal server error
 */
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
