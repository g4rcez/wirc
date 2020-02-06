import { User } from "../user/user";
import uuid from "uuid/v4";

export class Chat {
  public id: string;

  public name: string;

  public owner: User;
  public users: Map<string, User>;

  public messages: Message[];

  public constructor(props: Partial<Chat>) {
    this.id = props.id || uuid();
    this.name = props.name || "";
    this.owner = new User(props.owner);
    this.messages = [];
    this.users = new Map();
  }
}

export class Message {
  public timestamp: Date;
  public text: string;
  public owner: string;
}
