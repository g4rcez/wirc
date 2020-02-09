const {
  register,
  getUserByEmail
} = require("../build/services/user.service").default;

test("Register valid user", () => {
  const user = register({
    birthDate: "1970-01-01",
    email: "test@gmail.com",
    nickname: "vandalvnl"
  });
  const getUser = getUserByEmail(user.email);
  expect(getUser).not.toBeNull();
});
