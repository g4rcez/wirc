export type Validations<T> = {
  [key in keyof T]: (value: T[key], object: T) => boolean;
};

export const validator = <T>(data: T, validations: Validations<T>) => {
  return Object.entries(
    validations
  ).every(([key, validation]: [string, unknown]) =>
    (validation as Function)(data[key], data)
  );
};

const nicknameRegex = /^[a-z][a-zA-Z_0-9-]{2,31}$/;
export const isNickname = (nickname: string) => nicknameRegex.test(nickname);
