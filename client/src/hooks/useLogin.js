import { useLogMutation } from "../redux/apiSlices/userAPI";

import { UseDispatch, useDispatch } from "react-redux";

export const useLogin = (userData) => {
  const [fetch, { data, isLoading, error }] = useLogMutation();
  const dispatch = useDispatch()
  let isEmail, email, username, password, request, isFound, isError;
  const sendRequest = () => {
    isEmail = JSON.stringify(userData.usernameOrEmail).includes(`@`);
    if (isEmail) {
      email = userData.usernameOrEmail;
      username = "notProvided";
      password = userData.password;
      request = { email, username, password };
    } else {
      email = "notProvided";
      username = userData.usernameOrEmail;
      password = userData.password;
      request = { email, username, password };
    }
    fetch(request);
  };

  isError = error === undefined;
  isFound = data !== undefined;
  return { sendRequest, isError, isFound };
};
