const Note = require('../models/Note');

const getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id, isDeleted: false });
    res.json(notes);
};

const createNote = async (req, res) => {
    const { title, content, tags } = req.body;

    const note = new Note({
        user: req.user._id,
        title,
        content,
        tags
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
};

const getNoteById = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.user.toString() === req.user._id.toString()) {
        res.json(note);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
};

const updateNote = async (req, res) => {
    const { title, content, tags } = req.body;

    const note = await Note.findById(req.params.id);

    if (note && note.user.toString() === req.user._id.toString()) {
        note.title = title;
        note.content = content;
        note.tags = tags;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
};

const deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.user.toString() === req.user._id.toString()) {
        note.isDeleted = true;
        note.deletedAt = Date.now();

        const deletedNote = await note.save();
        res.json(deletedNote);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
};

const archiveNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.user.toString() === req.user._id.toString()) {
        note.isArchived = !note.isArchived;

        const archivedNote = await note.save();
        res.json(archivedNote);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
};

const getArchivedNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id, isArchived: true, isDeleted: false });
    res.json(notes);
};

const getNotesByTag = async (req, res) => {
    const tag = req.params.tag;
    const notes = await Note.find({ user: req.user._id, tags: tag, isDeleted: false });
    res.json(notes);
};

module.exports = { getNotes, createNote, updateNote, deleteNote, getNoteById, archiveNote, getArchivedNotes, getNotesByTag };



