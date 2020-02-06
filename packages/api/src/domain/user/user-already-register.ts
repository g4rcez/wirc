import { MessageMap } from "@wirc/common";

export class UserAlreadyRegister extends Error {
  constructor() {
    super(MessageMap.userAlreadyRegister);
    this.name = "UserAlreadyRegister";
  }
}
