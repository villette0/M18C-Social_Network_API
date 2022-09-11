const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

//Aggregate function to get all users overall
module.exports = {
    getThoughts(req, res) {
    Thought.find()
        .then((thoughts) => {res.json(thoughts)})       
        .catch(err => res.status(500).json(err))
    },
    getSingleThought(req, res) {
        Thought.findById({_id: req.params.thoughtId})
        .then((user) => {res.json(user)})
        .catch(err => res.status(500).json(err))
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then(() => {res.json("Thought has been deleted.")})
        .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {new: true}
        )
        .then(() => {res.json("Thought has been updated.")})
        .catch((err) => res.status(500).json(err));
    }
}

 