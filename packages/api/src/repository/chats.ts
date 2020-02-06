import { Chat, Message } from "../domain/chat/chat";
import { User } from "../domain/user/user";
import { NewChatExistError } from "../domain/chat/new-chat-exist-error";
import { UserAlreadyInChat } from "../domain/user/user-already-in-chat";

class Chats {
  private chats: Map<string, Chat>;

  public constructor() {
    this.chats = new Map();
  }

  public newChat(name: string, owner: User) {
    const chat = new Chat({
      name,
      owner
    });
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

  public getUserFromChat(chat: string) {
    return [...this.chats.get(chat)?.users.values()];
  }

  public newMessageOnChat(chat: string, message: Message) {
    this.chats.get(chat)?.messages.push(message);
  }

  public getMessagesFromChat(chat: string) {
    return [...this.chats.get(chat)?.messages];
  }

  public chatExist(chat: string) {
    return this.chats.has(chat);
  }
}

export const chats = new Chats();

export const users = new Map<string, Chat>();
