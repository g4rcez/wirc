import { User } from "../domain/user/user";
import { UserAlreadyRegister } from "../domain/user/user-already-register";

export type RegisterData = Omit<User, "id">;

class Users {
  private users: Map<string, User>;

  public constructor() {
    this.users = new Map();
  }

  public findUserByEmail(email: string) {
    return this.users.get(email);
  }

  public existUserByEmail(email: string) {
    return this.users.has(email);
  }

  public register(user: RegisterData) {
    const registerUser = new User(user);
    if (this.existUserByEmail(registerUser.email)) {
      throw new UserAlreadyRegister();
    }
    this.users.set(registerUser.email, registerUser);
    return registerUser;
  }
}

export const userRepository = new Users();
