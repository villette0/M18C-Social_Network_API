const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
	deleteReaction
} = require('../../controllers/thoughtController')

// Route: http://localhost:3001/api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// Route: http://localhost:3001/api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .delete(deleteThought)
    .put(updateThought);

// Route: http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(createReaction);

// Route: http://localhost:3001/api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;