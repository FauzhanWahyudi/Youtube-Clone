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
const Follow = require("../models/follow");

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
    user(_id:ID): UserByIdResponse,
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
    //get all user
    users: async (parent, args, contextValue) => {
      //authenticate user
      await contextValue.auth();

      //get all users
      return User.findAll();
    },

    //get user profile (data) with followers and following data
    user: async (parent, args, contextValue) => {
      let _id = args._id;
      if (!_id) {
        const { user } = await contextValue.auth();
        _id = user._id;
      }
      try {
        const user = await User.findById(_id);
        const followers = await Follow.getFollowers(user._id);
        const following = await Follow.getFollowing(user._id);
        return {
          user,
          followers,
          following,
        };
      } catch (error) {
        console.log("🚀 ~ User ~ findById ~ error:", error);
        throw error;
      }
    },

    //search user by name or username
    searchUser: async (parent, args, contextValue) => {
      //authenticate user
      await contextValue.auth();

      //check input
      if (!args.search) return [];
      return User.search(args.search);
    },
  },

  Mutation: {
    //register new user
    addUser: async (parent, args) => {
      const { username, email, password } = args.body;

      //check username
      if (!username) {
        throw new Error("Username is required");
      }

      //check if username is unique
      let user = await User.findByUsername(username);
      if (user) {
        throw new Error("Username already registered");
      }

      //check email
      if (!email) {
        throw new Error("Email is required");
        //check if email is valid
      } else if (!isEmail(email)) {
        throw new Error("Invalid email password");
      }
      //check if email is unique
      user = await User.findByEmail(email);
      if (user) {
        throw new Error("Email already registered");
      }

      //check password
      if (!password) {
        throw new Error("Password is required");
      }
      //check password length
      if (password.length < 5) {
        throw new Error("Password at least 5 character");
      }

      //create new user
      const { newUser } = await User.addUser(args.body);
      return newUser;
    },

    //user login
    login: async (parent, args) => {
      //check if username is inputted
      if (!args.body.username) {
        throw new Error("Username is required");
      }
      //check if password is inputted
      if (!args.body.password) {
        throw new Error("Password is required");
      }
      //get access_token and user data
      const { access_token, user } = await User.login(args.body);
      return { access_token, user };
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
