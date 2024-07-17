const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

//Schema to create Reaction model
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'Reaction is required',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

//Schema to create Thought model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Thought is required',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// create a virtual property called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// initialize Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;