import axios from "axios";
import { UserType } from "../../types/types";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
}

const useEditUser = (url: string) => {
  const { data, mutate, error } = useSWR(url, fetcher);

  const updateUser = async (user: UserType) => {
    await axios.put(url, user)
      .then(() => {
        mutate();
      })
      .catch(error => console.error('ユーザー情報の更新に失敗しました', error));
  }

  return { data, error, updateUser };
};

export default useEditUser;