import { useLogMutation } from "../redux/apiSlices/userAPI";

import { useDispatch } from "react-redux";
import { updateDataReducer } from "../redux/slices/userSlice";

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
  dispatch(updateDataReducer(data))

  isError = error === undefined;
  isFound = data !== undefined;
  return { sendRequest, isError, isFound };
};
