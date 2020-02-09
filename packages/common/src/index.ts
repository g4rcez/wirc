export * from "./data";
export * from "./validations";
export * from "./domain/chat/chat";
export * from "./domain/chat/new-chat-exist-error";
export * from "./domain/user/user";
export * from "./domain/user/user-already-in-chat";
export * from "./domain/user/user-already-register";

export const uuid = (): string =>
  //@ts-ignore
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (a: any) =>
    (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
  );
