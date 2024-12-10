const { ObjectId } = require("mongodb");
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

  type Author{
    name: String,
    email: String,
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
    Author: [Author]
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
    posts: () =>
      db
        .collection("posts")
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "Author",
            },
          },
        ])
        .sort({ createdAt: -1 })
        .toArray(),
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
        authorId: new ObjectId(authorId),
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      };
      await db.collection("posts").insertOne(newPost);
      return newPost;
    },
  },
};

module.exports = { postsTypeDefs, postsResolvers };
