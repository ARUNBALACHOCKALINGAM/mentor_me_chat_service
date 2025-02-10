const express = require("express");
const chatRouter = express.Router();
const chatController = require("../controllers/chat.controller");

chatRouter.post('/send',chatController.sendChat);
chatRouter.post('/history',chatController.getHistory);

module.exports = chatRouter;
