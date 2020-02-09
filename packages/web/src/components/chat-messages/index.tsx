import { Chat, User } from "@wirc/common";
import React, { useEffect, useState } from "react";
import { sessionService } from "../../service/session.service";
import { useMessages } from "../../wirc/use-messages";

const items = ["#0ff", "#00f", "#0f0", "#f0f", "#ff0"];

const getRandomTextColor = () =>
  items[Math.floor(Math.random() * items.length)];

type MessageProps = {
  owner: string;
  isSameOwner: boolean;
  color: string;
  text: string;
};
export const Message: React.FC<MessageProps> = ({
  isSameOwner,
  color,
  owner,
  text
}) => {
  if (isSameOwner) {
    return (
      <div className="w-100 black tr justify-end">
        <div className="message">
          <p className="message--origin">you</p>
          <p className="message--text">{text}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-100 black tl justify-start">
      <div className="message">
        <p style={{ color }} className="message--origin">
          {owner}
        </p>
        <p className="message--text">{text}</p>
      </div>
    </div>
  );
};

type Props = {
  chats: Chat[];
};
export const ChatMessages: React.FC<Props> = ({ chats }) => {
  const [, messages] = useMessages(chats);
  const [owner, setOwner] = useState<User | null>(null);
  useEffect(() => {
    setOwner(sessionService.getUser());
  }, []);

  return (
    <div
      className="w-100 mw9 center flex-auto flex-grow flex flex-column"
      style={{ flex: "1 1 auto", overflowY: "auto", height: "0px" }}
    >
      {messages.map(msg => {
        return (
          <Message
            color={getRandomTextColor()}
            isSameOwner={msg.owner === owner?.nickname}
            owner={msg.owner}
            text={msg.text}
          />
        );
      })}
    </div>
  );
};
