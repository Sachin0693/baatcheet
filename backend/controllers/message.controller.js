import uploadOnCloudinary from "../config/cloudinary";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

export const sendMessage = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;
    let { message } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    let newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMassage._id],
      });
    } else {
      conversation.messages.push(newMessage);
      await conversation.save();
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: "message sent error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");

    return res.status(500).json(conversation?.messages);
  } catch (error) {
    return res.status(500).json({ message: "get message sent error" });
  }
};
