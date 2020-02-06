const { validator, isNickname, MessageMap } = require("../build");
const { isEmail } = require("sidekicker/lib/validations");
const { isEmpty } = require("sidekicker/lib/comparable");
const moment = require("moment");

const validatorSchema = {
  email: emailStr => isEmail(emailStr),
  birthDate: date => moment(date, "YYYY-MM-DD").isBefore(new Date(), "day"),
  nickname: nick => isNickname(nick)
};

test("valid user", () => {
  expect(
    validator(
      { email: "test@gmail.com", birthDate: "1970-01-11", nickname: "g4rcez" },
      validatorSchema
    )
  ).toBe(true);
});

test("user with invalid email", () => {
  expect(
    validator(
      { email: "test-gmail.com", birthDate: "1970-01-11", nickname: "g4rcez" },
      validatorSchema
    )
  ).toEqual(false);
});
