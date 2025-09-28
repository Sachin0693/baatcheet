import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
});
const Message = mongoose.model("Message", messageSchema);
export default Message;
