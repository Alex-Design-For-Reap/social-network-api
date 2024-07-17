const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
    } = require('../../controllers/userController');

// get all users and create a user
router.route('/').get(getAllUsers).post(createUser);

// get user by id, update user, and delete user
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// add friend to a user and remove friend from a user
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;