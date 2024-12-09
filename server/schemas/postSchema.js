const { db } = require("../config/db");

const postsTypeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    
    
  type Comments {
    content: String!,
    username: String!,
    createdAt: String,
    updatedAt: String,
  }

  type Likes {
    username: String!,
    createdAt: String,
    updatedAt: String,
  }

  type Post {
    _id: ID!,
    content: String!,
    tags: [String],
    imgUrl: String,
    authorId: ID!,
    comments: [Comments],
    likes: [Likes],
    createdAt: String,
    updatedAt: String,
  }

  type Query {
    posts: [Post]  
  }

  input PostForm {
    content: String!,
    tags: [String],
    imgUrl: String,
    authorId: ID!,
  }

  type Mutation{
    addPost(body:PostForm!):Post
  }
`;

const postsResolvers = {
  Query: {
    posts: () => db.collection("posts").find().toArray(),
  },

  Mutation: {
    addPost: async (parent, args) => {
      const { authorId, content } = args.body;
      if (!authorId) {
        throw new Error("Author Id is required");
      }
      if (!content) {
        throw new Error("Content is required");
      }
      const newPost = {
        ...args.body,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      };
      await db.collection("posts").insertOne(newPost);
      return newPost;
    },
  },
};

module.exports = { postsTypeDefs, postsResolvers };
