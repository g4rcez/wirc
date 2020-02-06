import { isNickname } from "@wirc/common";
import moment from "moment";
import { isEmail } from "sidekicker/lib/validations";
import uuid from "uuid/v4";

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
  email: (emailStr: string) => isEmail(emailStr),
  birthDate: (date: string | Date) =>
    moment(date, "YYYY-MM-DD").isBefore(new Date(), "day"),
  nickname: (nick: string) => isNickname(nick)
};
