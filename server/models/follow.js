const { ObjectId } = require("mongodb");
const { db } = require("../config/db");

module.exports = class Follow {
  static collection = db.collection("follows");
  static async addFollowing(body) {
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();
    const newFollow = {
      ...body,
      followingId: new ObjectId(body.followingId),
      createdAt,
      updatedAt,
    };
    await Follow.collection.insertOne(newFollow);
    return newFollow;
  }
};
