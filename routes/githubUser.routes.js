const express = require("express");
const router = express.Router();
const githubUserController = require("../controllers/githubUser.controllers");

//* 1. GitHub User Data Storage
router.get("/:username", githubUserController.getGithubUserName);

router.get("/followers/:username", githubUserController.findMutualFollowers);

router.get("/user", githubUserController.searchUsers);

router.delete("/user/:id", githubUserController.deleteUser);

module.exports = router;
