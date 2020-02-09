import { Chat, ChatEvents, Message } from "@wirc/common";
import { useEffect, useState } from "react";
import { io } from "..";
export const useMessages = (chats: Chat[]): [Chat, Message[]] => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    io.on(ChatEvents.NewMessage, (message: Message) => {
      setMessages(e => e.concat(message));
      setChat(e => {
        return new Chat({ ...e, messages });
      });
    });
    io.on("disconnect", () => setChat(null));
  }, []);
  useEffect(() => {
    if (chats.length > 0) {
      setChat(chats[0]);
    }
  }, [chats]);
  return [new Chat(chat || {}), messages];
};
