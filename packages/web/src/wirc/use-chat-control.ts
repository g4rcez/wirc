import { Chat, ChatEvents, Message } from "@wirc/common";
import { useCallback, useEffect, useState } from "react";
import { io } from "..";
import { sessionService } from "../service/session.service";
export const useChatControl = () => {
  const [messages, setMessages] = useState([] as Message[]);
  const [online, setOnline] = useState(false);
  const [chats, setChats] = useState([] as Chat[]);

  useEffect(() => {
    setOnline(io.connected);
  }, [io.connected]);
  useEffect(() => {
    io.on(ChatEvents.ChatsInformation, setChats);
    io.on("disconnect", () => setOnline(false));
    return () => {
      setMessages([]);
      io.disconnect();
    };
  }, []);

  const sendMessage = useCallback((text: string) => {
    io.emit(ChatEvents.NewMessage, sessionService.getUser(), "main", text);
  }, []);

  return { messages, online, chats, hasChats: chats.length > 0, sendMessage };
};
