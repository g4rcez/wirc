import {
  User,
  UserValidatorSchema,
  ValidationsType,
  validator
} from "@wirc/common";
import { RegisterData, userRepository } from "../repository/user.repository";

const register = (
  registerUser: RegisterData
): User | false | ValidationsType<User>[] => {
  const isValidUser = validator(registerUser, UserValidatorSchema);
  if (isValidUser.valid) {
    if (!userRepository.existUserByEmail(registerUser.email)) {
      try {
        return userRepository.register(registerUser);
      } catch (error) {
        console.log("ERROR", error);
        return false;
      }
    }
  }
  return isValidUser.validations;
};

const getUserByEmail = (email: string) => userRepository.findUserByEmail(email);

export default {
  register,
  getUserByEmail
};
