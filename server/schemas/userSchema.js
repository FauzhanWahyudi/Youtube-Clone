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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    # books: [Book],
    # book(title: String): Book
    users: [User]
    posts: [Posts]
    follows: [Follow]
  }
`;

const userResolvers = {
  Query: {
    // books: () => books,
    // book: (parent, args) => books.find((book) => book.title == args.title),
    users: () => users,
    posts: () => posts,
    follows: () => follows,
  },
};

module.exports = { userTypeDefs, userResolvers };
