const { Schema, model } = require('mongoose');
const { use } = require('../routes/api');

//Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
});

// create a virtual property called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// initialize User model
const User = model('User', userSchema);

module.exports = User;