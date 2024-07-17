const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
    } = require('../../controllers/thoughtController');

// get all thoughts and create a thought
router.route('/').get(getAllThoughts).post(createThought);

// get thought by id, update thought, and delete thought
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// add reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

// remove reaction from a thought
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;