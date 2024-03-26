const githubUserService = require("../services/githubUser.services");

const getGithubUserName = async (request, response) => {
  try {
    const { username } = request.params;

    const user = await githubUserService.getGithubUserByName(username);

    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const findMutualFollowers = async (request, response) => {
  try {
    const { username } = request.params;
    const mutualFollowers = await githubUserService.findMutualFollowers(
      username
    );
    response.status(200).json(mutualFollowers);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const searchUsers = async (request, response) => {
  try {
    const { username } = request.query;
    const users = await getGithubUserName.searchUsers(username);
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await githubUserService.deleteUser(id);
    response.status(204).json(user);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
module.exports = {
  getGithubUserName,
  findMutualFollowers,
  searchUsers,
  deleteUser,
};
