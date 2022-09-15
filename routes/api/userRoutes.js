const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
	deleteFriend
} = require('../../controllers/userController')

// Insomnia Route: http://localhost:3001/api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// Insomnia Route: http://localhost:3001/api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser);

// // Insomnia Route: http://localhost:3001/api/users/:userId/friends
// router.route('/:userId/friends')
//     .post(addFriend);

// Insomnia Route: http://localhost:3001/api/users/:userId/friends/friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;