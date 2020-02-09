export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const endpoints = {
  userRegister: `${BASE_URL}/user/register`, // post
  hasUserByEmail: (email: string) => `${BASE_URL}/user/search?email=${email}` // get
};
