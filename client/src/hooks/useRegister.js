import { useCreateUserMutation } from "../redux/apiSlices/userAPI";

export const useRegister = () => {
  const [createUser, { data, isLoading, error }] = useCreateUserMutation();

  const fetchData = (newUser) => {
    createUser(newUser);
  };

  return { fetchData, data, isLoading, error };
};
