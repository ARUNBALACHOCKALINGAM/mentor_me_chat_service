const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const connectDb = require("./app/database/db.connect");
const Chat = require("./app/models/chat.model");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

connectDb();

io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle message sending and save to DB
    socket.on("sendMessage", async ({ sender, receiver, message, senderUserType, receiverUserType }) => { // ADDED user types
        try {
            const newMessage = new Chat({
                sender,
                receiver,
                message,
                senderUserType,  // ADDED
                receiverUserType  // ADDED
            });
            await newMessage.save();

            io.emit("receiveMessage", { sender, receiver, message, senderUserType, receiverUserType }); //Keep the user types in the emitted message

        } catch (error) {
            console.error("Error saving message:", error);
            socket.emit("messageError", "Failed to send message.");
        }
    });

    // Handle fetching chat history
    socket.on("fetchMessages", async ({ user1, user2 }) => {
        try {
            const messages = await Chat.find({
                $or: [{ sender: user1, receiver: user2 }, { sender: user2, receiver: user1 }],
            }).sort({ timestamp: 1 });

            socket.emit("chatHistory", messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
            socket.emit("chatHistoryError", "Failed to retrieve chat history.");
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(process.env.PORT, () => console.log("Server running on port 5000"));
