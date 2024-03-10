import { useCreateUserMutation } from "../redux/apiSlices/userAPI";

export const useRegister = () => {
  const [createUser, { data, isLoading, error }] = useCreateUserMutation();

  const fetchData = (newUser) => {
    console.log(newUser);
    createUser(newUser);
  };
  console.log(data);
  console.log(error);
  return { fetchData, data, isLoading, error };
};
