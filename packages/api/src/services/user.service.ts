import { RegisterData, userRepository } from "../repository/user.repository";
import { UserValidatorSchema, User } from "../domain/user/user";
import { validator } from "@wirc/common";

const register = (registerUser: RegisterData): User | false => {
  const isValidUser = validator(registerUser, UserValidatorSchema);
  if (isValidUser) {
    if (userRepository.existUserByEmail(registerUser.email)) {
      return userRepository.register(registerUser);
    }
  }
  return false;
};

export default {
  register
};
