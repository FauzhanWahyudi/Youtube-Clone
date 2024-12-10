const { db } = require("../config/db");

module.exports = class Post {
  static collection = db.collection("posts");

  static async getPostById(_id) {
    // console.log(_id);
    try {
      const post = await Post.collection
        .aggregate([
          { $match: { _id: new ObjectId(_id) } },
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "author",
            },
          },
        ])
        .toArray();
      return post[0];
    } catch (error) {
      console.log("🚀 ~ Post ~ getPostById ~ error:", error);
    }
  }

  static async addPost(body) {
    const newPost = {
      ...body,
      authorId: new ObjectId(authorId),
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    await Post.collection.insertOne(newPost);
    return newPost;
  }

  static async addLike(body) {
    const { postId, username } = body;
    const newLike = {
      username,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    await Post.collection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          likes: newLike,
        },
      }
    );
    return newLike;
  }

  static async addComment(body) {
    const { postId, username, content } = body;
    const newComment = {
      content,
      username,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    await Post.collection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          comments: newComment,
        },
      }
    );
    return newComment;
  }
};
