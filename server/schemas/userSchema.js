// const books = [
//   {
//     title: "The Awakening",
//     author: "Kate Chopin",
//   },
//   {
//     title: "City of Glass",
//     author: "Paul Auster",
//   },
// ];

const users = [
  {
    email: "The Awakening",
    name: "Kate Chopin",
    password: "K111",
    username: "1in",
  },
  {
    email: "City of Glass",
    name: "Paul Auster",
    password: "Pq1111111",
    username: "P1",
  },
];
const isEmail = require("is-email");
const User = require("../models/user");

const userTypeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    _id: ID!,
    name: String,
    username: String,
    email: String,
    password: String,
  }

  type UserByIdResponse{
    user: User!
    followers: [Follow!]
    following: [Follow!]
  }
  
  type Query {
    users: [User],
    user(_id: ID!): UserByIdResponse,
    searchUser(search: String): [User],
  }

  input AddUserInput {
    name: String!,
    email: String!,
    username: String!,
    password: String!,
  }

  input LoginInput {
    username: String!,
    password: String!,
  }

  type LoginResponse{
    access_token: String!
    user: User!
  }

  type Mutation {
    addUser(body: AddUserInput!): User!,
    login(body: LoginInput!): LoginResponse!,
  }
`;

const userResolvers = {
  Query: {
    users: () => User.findAll(),
    user: (parent, args) => User.findById(args._id),
    searchUser: (parent, args) => {
      if (!args.search) return [];
      return User.search(args.search);
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const users = await User.findAll();
      let user = null;

      const { username, email, password } = args.body;

      //check username
      if (!username) {
        throw new Error("Username is required");
      }

      //check if username is unique
      user = users.find((user) => user.username === username);
      if (user) {
        throw new Error("Username already registered");
      }

      //check email
      if (!email) {
        throw new Error("Email is required");
      } else if (!isEmail(email)) {
        throw new Error("Invalid email password");
      }
      //check if email is unique
      user = users.find((user) => user.email === email);
      if (user) {
        throw new Error("Email already registered");
      }

      //check password
      if (!password) {
        throw new Error("Password is required");
      }
      if (password.length < 5) {
        throw new Error("Password at least 5 character");
      }
      const { newUser } = await User.addUser(args.body);
      return newUser;
    },

    login: async (parent, args) => {
      if (!args.body.username) {
        throw new Error("Username is required");
      }
      if (!args.body.password) {
        throw new Error("Password is required");
      }
      const { access_token, user } = await User.login(args.body);
      return { access_token, user };
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
