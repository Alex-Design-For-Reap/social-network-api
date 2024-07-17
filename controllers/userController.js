const {User, Thought} = require('../models');

module.exports = {
    //get all Users
    async getAllUsers (req, res) {
        try {
            const dbUserData = await User.find({}).populate({path: 'thoughts', select: '-__v'});
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //get User by id
    async getUserById({params}, res) {
        try {
            const dbUserData = await User.findOne({_id: params.userId}).populate({path: 'thoughts', select: '-__v'});
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //create User
    async createUser({body}, res) {
        try {
            const dbUserData = await User.create(body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //update User
    async updateUser({params, body}, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({_id: params.userId}, body, {new: true, runValidators: true});
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //delete User and their thoughts
    async deleteUser({params}, res) {
        try {
            const dbUserData = await User
                .findOneAndDelete({_id: params.userId});
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            await Thought.deleteMany({_id: {$in: dbUserData.thoughts}});
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //add friend to User
    async addFriend({params}, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                {_id: params.userId},
                {$addToSet: {friends: params.friendId}},
                {new: true}
            );
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //remove friend from User
    async removeFriend({params}, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {friends: params.friendId}},
                {new: true}
            );
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};