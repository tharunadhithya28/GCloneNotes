const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getNotes, createNote, updateNote, deleteNote, getNoteById, archiveNote, getArchivedNotes, getNotesByTag } = require('../controllers/noteController');

router.route('/archived').get(protect, getArchivedNotes);

router.route('/').get(protect, getNotes).post(protect, createNote);
router.route('/:id').get(protect, getNoteById).put(protect, updateNote).delete(protect, deleteNote);
router.route('/:id/archive').put(protect, archiveNote);

router.route('/tags/:tag').get(protect, getNotesByTag);

module.exports = router;
