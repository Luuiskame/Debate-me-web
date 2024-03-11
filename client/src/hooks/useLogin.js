import { useLogMutation } from "../redux/apiSlices/userAPI";
import { useDispatch } from "react-redux";
import { updateDataReducer } from "../redux/slices/userSlice";
import { useEffect } from "react";

export const useLogin = (userData) => {
  const [fetch, { data, isLoading, error }] = useLogMutation();
  let isEmail, email, username, password, request, isFound, isError;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateDataReducer(data));
  }, [data]);

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
  return { sendRequest, isError, data, isFound };
};
