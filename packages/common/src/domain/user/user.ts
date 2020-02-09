import { isNickname } from "../../validations";
import moment from "moment";
import { isEmail } from "sidekicker/lib/validations";
import { uuid } from "../..";


const BIRTH_DATE_MASK = "YYYY-MM-DD";

const getValidDate = (maybeDate?: string | Date) => {
  const date = moment(maybeDate, BIRTH_DATE_MASK);
  if (date.isValid()) {
    return date.toDate();
  }
  return new Date();
};

export class User {
  public id: string;

  public nickname: string;

  public email: string;

  public birthDate: Date | string;

  public constructor(props?: Partial<User>) {
    this.nickname = props?.nickname || "";
    this.id = props?.id || uuid();
    this.birthDate = getValidDate(props?.birthDate);
    this.email = props?.email || "";
  }
}

export const UserValidatorSchema = {
  email: (email: string) => {
    const messages = [];
    if (isEmail(email)) {
      messages.push("emptyEmail");
    }
    const isValid = isEmail(email);
    if (!isValid) {
      messages.push("invalidEmail");
    }
    return { valid: isValid, messages };
  },
  birthDate: (date: string | Date) => ({
    valid: moment(date, "YYYY-MM-DD").isBefore(new Date(), "day"),
    messages: ["invalidDate"]
  }),
  nickname: (nick: string) => ({
    valid: isNickname(nick),
    messages: ["invalidNickname"]
  })
};
