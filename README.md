# Social Network API

This is an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The API is built using Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Walk Through Demo Video](#walk-through-demo-video)
- [API Routes](#api-routes)
- [Models](#models)
- [Technologies and Dependencies](#technologies-and-dependencies)
- [Contributing](#contributing)
- [Other ways to contribute and questions](#other-ways-to-contribute-and-questions)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Alex-Design-For-Reap/social-network-api.git
   cd social-network-api

   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB:**

   Ensure you have MongoDB installed and running locally.

4. **Seeding the Database (optional)**

   ```bash
   node seed.js
   ```

   This will populate the database with sample users and thoughts.

5. **Run the application**
   ```bash
   npm start
   ```
   The server will start on http://localhost:3001.

## Usage

Use Insomnia, Postman, or any other API client to test the API routes.

## API Routes

### Users

#### GET all users

/api/users

#### Get a single user by its \_id and populated thought and friend data

/api/users/:userId

#### POST a new user

/api/users

JSON body example:

```bash
{
  "username": "Alex",
  "email": "alex.silva@gmail.com"
}
```

#### PUT (update a new user by its \_id)

/api/users/:userId

JSON body example:

```bash
{
  "username": "AlexUpdated",
  "email": "alex.silva@gmail.com"
}
```

#### DELETE a user by its \_id

/api/users/:userId

#### POST to add a new friend to a user's friend list

/api/users/friends/:friendId

- add your own `:friendId` like "6698f3e690f98a2352a04b8f"

### DELETE a friend from a user's friend list

/api/users/friends/:friendId

### Thoughts

#### GET all thoughts

/api/thoughts

#### Get a single thought by its \_id

/api/users/:thoughtId

#### POST a new thought

/api/thoughts

JSON body example:

```bash
{
	"thoughtText": "Here's a NEW thought...",
	"username": "Alex",
	"userId": "6698f3e690f98a2352a04b8f"
}
```

#### PUT (update a new thought by its \_id)

/api/thoughts/:thoughtId

JSON body example:

```bash
{
	"thoughtText": "Here's a UPDATED thought...",
}
```

#### DELETE a thought by its \_id

/api/thoughts/:thoughtId

### Reactions

#### POST to Create a reaction stored in a single thought's reactions array field

/api/thoughts/:thoughtId/reactions/

### DELETE a reaction by the reaction's reactionId value

/api/thoughts/:thoughtId/reactions/:reactionId

## Walk Through Demo Video

## Models

### User

- username: String, Unique, Required, Trimmed
- email: String, Required, Unique, Must match a valid email address
- thoughts: Array of \_id values referencing the Thought model
- friends: Array of \_id values referencing the User model (self-reference)

#### Schema Settings

Virtual friendCount that retrieves the length of the user's friends array field on query.

### Thought

- thoughtText: String, Required, Must be between 1 and 280 characters
- createdAt: Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query
- username: String, Required
- reactions: Array of nested documents created with the reactionSchema

#### Schema Settings

Virtual reactionCount that retrieves the length of the thought's reactions array field on query.

### Reaction (Schema Only)

- reactionId: Use Mongoose's ObjectId data type, Default value is set to a new ObjectId
- reactionBody: String, Required, 280 character maximum
- username: String, Required
- createdAt: Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query

## Technologies and Dependencies

- HTML, CSS, JavaScript
- Express.js
- MongoDB
- Mongoose ODM
- moment

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/YourFeature
   ```
3. Make your changes.
4. Commit your changes:
   ```sh
   git commit -m 'Add YourFeature'
   ```
5. Push to the branch:
   ```sh
   git push origin feature/YourFeature
   ```
6. Open a pull request.

## Other ways to contribute and questions

Contributions are welcome!
If you want to contribute or have any questions, here are my channels:
gitHub: https://github.com/Alex-Design-For-Reap

email: s.alexsilva@gmail.com

Author: Alex Da Silva https://github.com/Alex-Design-For-Reap/social-network-api
