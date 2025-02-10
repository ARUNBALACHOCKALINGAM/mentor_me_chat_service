import Chat from "../models/chat.model.js";

export const sendChat = async (req, res) => {
  const {senderId,receiverId,message,senderUserType,receiverUserType} = req.body;
  const newChat = new Chat({sender:senderId,receiver:receiverId,message:message,senderUserType:senderUserType,receiverUserType:receiverUserType});
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const getHistory = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    // Correct query to find messages in both directions
    const chatHistory = await Chat.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    }).sort({ createdAt: 1 }); // Sort by timestamp

    res.status(200).json(chatHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Failed to fetch chat history", error: error.message });
  }
};