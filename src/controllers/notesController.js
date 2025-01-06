const notesService = require("../services/notesService");

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

    // Call the service method
    const note = await notesService.share(req.user.id, noteId, sharedWith);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Note shared successfully",
      note,
    });
  } catch (error) {
    console.error(error);

    // Handle expected errors with status codes
    const statusCode = error.statusCode || 500; // Default to 500 for server errors
    res.status(statusCode).json({
      success: false,
      message: error.message || "Server error",
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
