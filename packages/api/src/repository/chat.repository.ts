import {
  Chat,
  Message,
  NewChatExistError,
  User,
  UserAlreadyInChat
} from "@wirc/common";

class Chats {
  private chats: Map<string, Chat>;

  public constructor() {
    this.chats = new Map();
  }

  public newChat(name: string, owner: User) {
    const chat = new Chat({ name, owner });
    if (this.chats.has(chat.id)) {
      throw new NewChatExistError();
    }
    this.chats.set(chat.id, chat);
    return chat;
  }

  public userInscribeInChat(chat: string, user: User) {
    const users = this.chats.get(chat)?.users;
    if (users?.has(user.email)) {
      throw new UserAlreadyInChat();
    }
    users?.set(user.email, user);
  }

  public getUserFromChat(chatName: string) {
    const chat = this.chats.get(chatName);
    if (!!chat) {
      return [...chat.users.values()];
    }
    return [];
  }

  public newMessageOnChat(chat: string, message: Message) {
    this.chats.get(chat)?.messages.push(message);
  }

  public getMessagesFromChat(chatName: string) {
    const chat = this.chats.get(chatName);
    if (!!chat) {
      return [...chat.messages.values()];
    }
    return [];
  }

  public getAllChats() {
    return [...this.chats.values()];
  }

  public chatExist(chat: string) {
    return this.chats.has(chat);
  }
}

export const chatRepository = new Chats();
