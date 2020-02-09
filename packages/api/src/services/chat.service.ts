import { Chat, Message, NewChatExistError } from "@wirc/common";
import { chatRepository } from "../repository/chat.repository";
import { userRepository } from "../repository/user.repository";

const newChat = (chatName: string, userEmail: string) => {
  if (!chatRepository.chatExist(chatName)) {
    try {
      const chat = chatRepository.newChat(
        chatName,
        userRepository.findUserByEmail(userEmail)!
      );
      return chat;
    } catch (error) {}
    return null;
  }
  throw new NewChatExistError();
};

const newMessage = (chat: string, email: string, text: string) => {
  const user = userRepository.findUserByEmail(email);
  const message = new Message({
    text,
    owner: user?.nickname
  });
  chatRepository.newMessageOnChat(chat, message);
  return message;
};

const getChatMessages = (chat: string) => {
  return chatRepository.getMessagesFromChat(chat);
};

const getAllChats = () =>
  chatRepository.getAllChats().map((x): Chat => ({ ...x, messages: [] }));

export default { newChat, getAllChats, newMessage, getChatMessages };
