const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, default: "" },
  fileUrl: { type: String, default: null }, // Store file URL
  fileType: { type: String, default: null }, // Optional: Store file type
  timestamp: { type: Date, default: Date.now },
  senderUserType: {
    type: String,
    enum: ["student", "mentor"], // Restrict to these values
    required: true // Or false, depending on your needs
  },
  receiverUserType: {
    type: String,
    enum: ["student", "mentor"],
    required: true
  }
});

module.exports = mongoose.model("Chat", chatSchema);

