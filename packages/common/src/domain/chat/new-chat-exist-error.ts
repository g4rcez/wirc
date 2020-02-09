import { MessageMap } from "../../data";

export class NewChatExistError extends Error {
  constructor() {
    super(MessageMap.newChatExistError);
    this.name = "NewChatExistError";
  }
}
