import React from "react";
import { ChatInput } from "../components/chat-input";
import { ChatMessages } from "../components/chat-messages";
import { RegisterModal } from "./register-modal";
import { useChatControl } from "./use-chat-control";

const Status: React.FC<{ online: boolean }> = ({ online }) => {
  if (online) {
    return <span className="ml2 b green">Online</span>;
  }
  return <span className="ml2 b red">Offline</span>;
};

const App: React.FC = () => {
  const chat = useChatControl();

  return (
    <div
      style={{ height: "100%" }}
      className="flex items-end flex-grow flex-column"
    >
      <div className="pa2 flex white justify-end items-center">
        Status: <Status online={chat.online} />
      </div>
      <ChatMessages chats={chat.chats} />
      <ChatInput sendMessage={chat.sendMessage} />
      <RegisterModal />
    </div>
  );
};

export default App;
