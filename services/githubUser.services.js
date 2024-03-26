const User = require("../models/githubUser.models");
const axios = require("axios");

const getGithubUserByName = async (username) => {
  try {
    let user = await User.findOne({ username });

    if (!user) {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      const userData = res.data;
      user = new User(userData);
      await user.save();
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const findMutualFollowers = async (username) => {
  try {
    const [followersRes, followingRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}/followers`),
      axios.get(`https://api.github.com/users/${username}/following`),
    ]);

    const followers = followersRes.data.map((user) => user.login);

    const following = followingRes.data.map((user) => user.login);

    const mutualFollowers = followers.filter((user) =>
      following.includes(user)
    );
    return mutualFollowers;
  } catch (error) {
    throw error;
  }
};

const searchUsers = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findOneAndDelete({ id });

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getGithubUserByName,
  findMutualFollowers,
  searchUsers,
  deleteUser,
};
