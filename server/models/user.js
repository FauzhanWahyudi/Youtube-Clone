const { ObjectId } = require("mongodb");
const { db } = require("../config/db");
const { hashPassword, comparePassword } = require("../helpers/hash");
const { signToken } = require("../helpers/jwt");
const Follow = require("./follow");

class User {
  static collection = db.collection("users");

  static async findAll() {
    try {
      return await User.collection.find().toArray();
    } catch (error) {
      console.log("🚀 ~ User ~ findAll ~ error:", error);
      throw error;
    }
  }

  static async findById(_id) {
    try {
      return await User.collection.findOne({ _id: new ObjectId(_id) });
    } catch (error) {
      console.log("🚀 ~ User ~ findById ~ error:", error);
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      return await User.collection.findOne({ username });
    } catch (error) {
      console.log("🚀 ~ User ~ findById ~ error:", error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      return await User.collection.findOne({ email });
    } catch (error) {
      console.log("🚀 ~ User ~ findById ~ error:", error);
      throw error;
    }
  }

  static async addUser(body) {
    try {
      const newUser = {
        ...body,
        password: hashPassword(body.password),
      };
      await User.collection.insertOne(newUser);
      return { newUser };
    } catch (error) {
      console.log("🚀 ~ User ~ addUser ~ error:", error);
      throw error;
    }
  }

  static async login(body) {
    try {
      const { username, password } = body;
      const user = await User.collection.findOne({ username });

      if (!user) {
        throw new Error("Invalid username/password");
      }
      const isValidatePassword = comparePassword(password, user.password);
      if (!isValidatePassword) {
        throw new Error("Invalid username/password");
      }

      const access_token = signToken(String(user._id));
      return { access_token, user };
    } catch (error) {
      console.log("🚀 ~ User ~ login ~ error:", error);
      throw error;
    }
  }

  static async search(search) {
    try {
      const users = await User.collection
        .find({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { username: { $regex: search, $options: "i" } },
          ],
        })
        .toArray();
      return users;
    } catch (error) {
      console.log("🚀 ~ User ~ search ~ error:", error);
      throw error;
    }
  }
}

module.exports = User;
