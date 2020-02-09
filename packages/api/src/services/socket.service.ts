import { Socket } from "socket.io";
import { ChatEvents, User } from "@wirc/common";
import chatService from "./chat.service";

export const onConnect = (socket: Socket) => {
  console.log("newConnection", socket.id, socket.client.id);
  socket.emit(ChatEvents.ChatsInformation, chatService.getAllChats());
  socket.broadcast.emit("broadcast", "hello friends!");

  chatListeners.forEach(x => {
    socket.on(x.on, x.fn(socket));
  });
};

const onRequestNewChat = (socket: Socket) => (chatId: string) => {
  console.log("READ CHAT", chatId, socket.id);
};

const onNewMessage = (socket: Socket) => (
  user: User,
  chatId: string,
  text: string
) => {
  const message = chatService.newMessage(chatId, user.email, text);
  console.log("New Message ->", user, message);
  socket.broadcast.emit(ChatEvents.NewMessage, message);
  socket.emit(ChatEvents.NewMessage, message);
};

export const chatListeners = [
  { on: ChatEvents.ChatMessages, fn: onRequestNewChat },
  { on: ChatEvents.NewMessage, fn: onNewMessage }
];
