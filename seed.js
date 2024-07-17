const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const users = [
  {
    username: 'lernantino',
    email: 'lernantino@gmail.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'alexdasilva',
    email: 'alexdasilva@gmail.com',
    thoughts: [],
    friends: [],
  },
];

const thoughts = [
  {
    thoughtText: 'Here\'s a cool thought...',
    username: 'lernantino',
    reactions: [],
  },
  {
    thoughtText: 'Here\'s another thought...',
    username: 'alexdasilva',
    reactions: [],
  },
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert users
    const createdUsers = await User.insertMany(users);

    // Add user ids to thoughts and insert thoughts
    thoughts[0].userId = createdUsers[0]._id;
    thoughts[1].userId = createdUsers[1]._id;
    const createdThoughts = await Thought.insertMany(thoughts);

    // Update users with thought ids
    await User.updateOne(
      { _id: createdUsers[0]._id },
      { $push: { thoughts: createdThoughts[0]._id } }
    );
    await User.updateOne(
      { _id: createdUsers[1]._id },
      { $push: { thoughts: createdThoughts[1]._id } }
    );

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
