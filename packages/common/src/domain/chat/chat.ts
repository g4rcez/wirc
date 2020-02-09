import { uuid } from "../..";
import { User } from "../user/user";

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
  public constructor(props: Partial<Message> = {}) {
    this.timestamp = props.timestamp || new Date();
    this.text = props.text || "";
    this.owner = props.owner || "";
  }
}

export enum ChatEvents {
  NewMessage = "NEW_MESSAGE",
  ChatsInformation = "CHAT_INFORMATION",
  ChatMessages = "GET_CHAT_MESSAGES",
  NewUser = "NEW_USER",
  UserExit = "USER_EXIT",
  OnConnect = "connection"
}
