const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

//Aggregate function to get all users overall
module.exports = {
// Get all thoughts
    getThoughts(req, res) {
    Thought.find()
        .then((thoughts) => {res.json(thoughts)})       
        .catch(err => res.status(500).json(err))
    },
// Get one thought
    getSingleThought(req, res) {
        Thought.findById({_id: req.params.thoughtId})
        .then((user) => {res.json(user)})
        .catch(err => res.status(500).json(err))
    },
// Create/post one thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
// Delete one thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then(() => {res.json("Thought has been deleted.")})
        .catch((err) => res.status(500).json(err));
    },
// Update/put one thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {new: true}
        )
        .then(() => {res.json("Thought has been updated.")})
        .catch((err) => res.status(500).json(err));
    },

	// Create/post reaction
	createReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true }
		)
			.populate({ path: "reactions", select: "-__v" })
			.select("-__v")
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought was found with this id." });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},
	// Delete reaction
	deleteReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.json(404).json({ message: "No thought was found with this id." });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(400).json(err));
	},
};