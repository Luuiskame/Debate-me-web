import { useLogMutation } from "../redux/apiSlices/userAPI";

export const useLogin = () => {
  const [log, { data, isLoading, error }] = useLogMutation();

  const fetchData = (userData) => {
    log(userData);
  };

  return { fetchData, isLoading, error, data };
};
