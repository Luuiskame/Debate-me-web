import { useExistMutation } from "../redux/apiSlices/userAPI";

export const useExist = () => {
  const [fetch, { data, isLoading, error }] = useExistMutation();
  let request, email, username;
  const sendEmailReq = (userData) => {
    email = userData;
    username = "notProvided";
    request = { username: username, email: email };
    fetch(request);
  };
  const sendUsernameReq = (userData) => {
    email = "notProvided";
    username = userData;
    request = { username: username, email: email };
    fetch(request);
  };

  return { sendEmailReq, sendUsernameReq, data, error };
};
