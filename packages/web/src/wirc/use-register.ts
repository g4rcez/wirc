import { sessionService } from "../service/session.service";
import { useEffect, useState, useCallback } from "react";
import { User } from "@wirc/common";
import { httpClient } from "../service/http-client";
import { endpoints } from "../service/endpoints";

export const useRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const user = sessionService.getUser();
    if (!!user) {
      httpClient.get(endpoints.hasUserByEmail(user.email)).then((e: any) => {
        if (!e.data.exist) {
          setShowModal(!e.data.exist);
          sessionService.clear();
        }
      });
    }
  }, []);
  useEffect(() => {
    const check = () => {
      if (!sessionService.authenticated) {
        setShowModal(true);
      }
    };
    check();
    const interval = setInterval(check, 1000);
    return clearInterval(interval);
  }, []);

  const register = useCallback((newUser: Omit<User, "id">) => {
    const birthDate = (newUser.birthDate as string)
      .replace(/[^0-9]/gi, "")
      .replace(/(\d{2})(\d{2})(\d{4})/, "$3-$2-$1");
    const user = new User({ ...newUser, birthDate });
    setLoading(true);
    httpClient
      .post(endpoints.userRegister, user)
      .then(({ data }) => {
        alert("Bem vindo ao wIRC");
        setLoading(false);
        setShowModal(false);
        sessionService.setUser(data as User);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
        setErrors(e.response.data);
      });
  }, []);

  return {
    showModal,
    register,
    loading,
    errors,
    onClose: () => setShowModal(false)
  };
};
