import { MessageMap } from "../../data";

export class UserAlreadyRegister extends Error {
  constructor() {
    super(MessageMap.userAlreadyRegister);
    this.name = "UserAlreadyRegister";
  }
}
