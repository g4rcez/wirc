import { MessageMap } from "../../data";

export class UserAlreadyInChat extends Error {
  constructor() {
    super(MessageMap.userAlreadyInChat);
    this.name = "UserAlreadyInChat";
  }
}
