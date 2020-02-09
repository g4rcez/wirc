type ObjectValidate = { valid: boolean; messages: string[] };

export type Validations<T> = {
  [key in keyof T]: (value: T[key], object: T) => ObjectValidate;
};

type Validate<T> = {
  valid: boolean;
  validations: {
    [key in keyof Partial<T>]: ObjectValidate & { key: keyof T };
  }[];
};

export type ValidationsType<T> = {
  [key in keyof Partial<T>]: ObjectValidate & {
    key: keyof T;
  };
};

export const validator = <T>(
  data: T,
  validations: Validations<T>
): Validate<T> => {
  const map = Object.entries(validations).map(
    ([key, validation]: [string, unknown]) => {
      const validateData = (validation as Function)(data[key], data);
      return { ...validateData, key };
    }
  );
  const valid = map.every(x => x.valid);
  const onlyWrongValidations = map.reduce((acc, el) => {
    if (el.valid) {
      return acc;
    }
    return [...acc, el];
  }, []);
  return { valid, validations: onlyWrongValidations };
};

const nicknameRegex = /^[a-z][a-zA-Z_0-9-]{2,31}$/;
export const isNickname = (nickname: string) => nicknameRegex.test(nickname);
