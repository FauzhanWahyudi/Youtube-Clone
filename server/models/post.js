const { db } = require("../config/db");

module.exports = class Post {
  static collection = db.collection("posts");
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
};
