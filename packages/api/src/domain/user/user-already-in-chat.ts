import { MessageMap } from "@wirc/common";

export class UserAlreadyInChat extends Error {
  constructor() {
    super(MessageMap.userAlreadyInChat);
    this.name = "UserAlreadyInChat";
  }
}
