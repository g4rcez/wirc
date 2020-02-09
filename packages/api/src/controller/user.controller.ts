import { Router } from "express";
import { User } from "@wirc/common";
import userService from "../services/user.service";

const userController = Router();

userController.post("/register", (req, res) => {
  const register = userService.register(req.body);
  if (register instanceof User) {
    return res.status(201).send(register);
  }
  if (register === false) {
    return res.status(500).send();
  }
  return res.status(406).send(register);
});

userController.get("/search", (req, res) => {
  const { email } = req.query;
  res.send({ exist: userService.getUserByEmail(email) !== undefined });
});

export default userController;
