import { MessageMap } from "@wirc/common";

export class NewChatExistError extends Error {
  constructor() {
    super(MessageMap.newChatExistError);
    this.name = "NewChatExistError";
  }
}
