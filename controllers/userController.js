const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

//Aggregate function to get all users overall
module.exports = {
    getUsers(req, res) {
    User.find()
        .then((users) => {res.json(users)})       
        .catch(err => res.status(500).json(err))
    },
    getSingleUser(req, res) {
        User.findById({_id: req.params.userId})
        .then((user) => {res.json(user)})
        .catch(err => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
        .then(() => {res.json("User has been deleted.")})
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {new: true}
        )
        .then(() => {res.json("User has been updated.")})
        .catch((err) => res.status(500).json(err));
    }
}

 