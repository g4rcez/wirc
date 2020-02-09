import { SessionStorage } from "storage-manager-js";
import { User } from "@wirc/common";

const key = "user";

const storage = new SessionStorage();

export const sessionService = {
  authenticated: !!storage.get(key),
  getUser: () => new User({ ...(storage.get(key) || {}) }),
  clear: () => storage.clear(),
  setUser: (user: User) => storage.set(key, new User(user))
};
