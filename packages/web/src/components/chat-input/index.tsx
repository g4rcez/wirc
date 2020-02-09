import React, { useState } from "react";

type Props = {
  sendMessage(text: string): void;
};

export const ChatInput: React.FC<Props> = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const onChangeOrSubmit = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const clearTextArea = () => setText("");

  const onKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.persist();
    if (event.key.toUpperCase() === "ENTER" && !event.shiftKey) {
      event.preventDefault();
      clearTextArea();
      sendMessage(text);
    }
  };

  return (
    <form className="black pa2 w-100 flex">
      <textarea
        onKeyPress={onKeyPress}
        onChange={onChangeOrSubmit}
        spellCheck={true}
        className="text-input"
        placeholder="Hack the planet"
        required
        value={text}
      />
    </form>
  );
};
