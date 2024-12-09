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

const userTypeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    _id: ID!,
    name: String,
    username: String,
    email: String,
    password: String,
  }

  type Comments {
    content: String,
    username: String,
    createdAt: String,
    updatedAt: String,
  }

  type Likes {
    username: String,
    createdAt: String,
    updatedAt: String,
  }

  type Posts {
    _id: ID!,
    content: String,
    tags: [String],
    imgUrl: String,
    authorId: ID,
    comments: [Comments],
    likes: [Likes],
    createdAt: String,
    updatedAt: String,
  }
    
  type Follow {
    _id: ID!,
    followingId: ID!,
    followerId: ID!,
    createdAt: String,
    updatedAt: String,
  }

  input searchInput {
    name: String,
    username: String,
  }

  type Query {
    users: [User],
    user(_id: ID!): User,
    searchUser(body: searchInput): [User],
    posts: [Posts],
    follows: [Follow],
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
  type Mutation {
    addUser(body: AddUserInput!): User,
    login(body: LoginInput!): String,
  }
`;

const userResolvers = {
  Query: {
    users: () => User.findAll(),
    user: (parent, args) => User.findById(args._id),
    searchUser: (parent, args) => User.search(args.body),
    posts: () => posts,
    follows: () => follows,
  },

  Mutation: {
    addUser: async (parent, args) => {
      console.log("register", args.body);
      const { newUser } = await User.addUser(args.body);
      return newUser;
    },
    login: async (parent, args) => {
      console.log("login", args.body);
      const { access_token } = await User.login(args.body);
      return access_token;
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
