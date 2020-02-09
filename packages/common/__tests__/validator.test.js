const { validator, isNickname, MessageMap } = require("../build");
const { isEmail } = require("sidekicker/lib/validations");
const { isEmpty } = require("sidekicker/lib/comparable");
const moment = require("moment");

const validatorSchema = {
  email: emailStr => {
    const messages = [];
    if (isEmail(emailStr)) {
      messages.push("emptyEmail");
    }
    const isValid = isEmail(emailStr);
    if (!isValid) {
      messages.push("invalidEmail");
    }
    return { valid: isValid, messages };
  },
  birthDate: date => ({
    valid: moment(date, "YYYY-MM-DD").isBefore(new Date(), "day"),
    messages: ["invalidDate"]
  }),
  nickname: nick => ({ valid: isNickname(nick), messages: ["invalidNickname"] })
};

test("valid user", () => {
  expect(
    validator(
      { email: "test@gmail.com", birthDate: "1970-01-11", nickname: "g4rcez" },
      validatorSchema
    )
  ).toEqual({ valid: true, validations: [] });
});

test("user with invalid email", () => {
  expect(
    validator(
      { email: "test-gmail.com", birthDate: "1970-01-11", nickname: "g4rcez" },
      validatorSchema
    )
  ).toEqual({
    valid: false,
    validations: [{ key: "email", messages: ["invalidEmail"], valid: false }]
  });
});
