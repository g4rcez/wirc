import useReducer, { PropState } from "use-typed-reducer";
import Modal from "../components/modal";
import React from "react";
import { Container } from "../components/grid";
import { useRegister } from "./use-register";
import { User } from "@wirc/common";

const initialState = {
  birthDate: "",
  nickname: "",
  email: ""
};

const reducer = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === "birthDate") {
      value = createDateMask(value);
    }
    return (): PropState<User> => ({ [name]: value });
  }
};

const createDateMask = (str: string = "") =>
  str
    .replace(/[^0-9]/g, "")
    .replace(/(\d\d)/, "$1/")
    .replace(/(\d\d\/)(\d\d)/, "$1$2/")
    .replace(/(\d{4})\d+?$/, "$1");

const inputClass = "bs input-reset ba b--black-20 pa2 mb2 db w-100";
const containerClass = "mv2 pa1 w-100";
const btn =
  "pointer b--transparent white bg-animate bg-near-black hover-bg-gray tc br2 ph3 pv2";
export const RegisterModal = () => {
  const form = useRegister();
  const [state, actions] = useReducer(initialState, reducer, true);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.register(state);
  };
  return (
    <Modal
      title="Welcome to wIRC"
      onClose={form.onClose}
      visible={form.showModal}
    >
      <form className="w-100 pa3" onSubmit={onSubmit}>
        <Container className={containerClass}>
          <label className="w-100" htmlFor="nickname">
            Nickname:
            <input
              className={inputClass}
              placeholder="nickname"
              required
              name="nickname"
              onChange={actions.onChange}
              value={state.nickname}
            />
          </label>
        </Container>
        <Container className={containerClass}>
          <label className="w-100" htmlFor="email">
            Email:
            <input
              className={inputClass}
              placeholder="email"
              required
              name="email"
              type="email"
              onChange={actions.onChange}
              value={state.email}
            />
          </label>
        </Container>
        <Container className={containerClass}>
          <label className="w-100" htmlFor="birthDate">
            Data de nascimento:
            <input
              className={inputClass}
              placeholder="Dia/Mês/Ano"
              required
              name="birthDate"
              pattern="\d{2}\/\d{2}\/\d{4}"
              onChange={actions.onChange}
              value={state.birthDate}
            />
          </label>
        </Container>
        <Container>
          <button className={btn} type="submit">
            Registrar
          </button>
        </Container>
      </form>
    </Modal>
  );
};
