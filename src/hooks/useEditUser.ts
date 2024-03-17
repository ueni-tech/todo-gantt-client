import axios from "axios";
import { UserType } from "../../types/types";
import useSWR from "swr";
import { useAtom } from "jotai";
import { userAtom } from "@/state/userAtom";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
}

const useEditUser = (url: string) => {
  const { data, mutate, error } = useSWR(url, fetcher);
  const [, setLoginUser] = useAtom(userAtom);

  const updateUser = async (user: UserType) => {
    await axios.put(url, user)
      .then(() => {
        mutate();
        setLoginUser(user);
      })
      .catch(error => console.error('ユーザー情報の更新に失敗しました', error));
  }

  return { data, error, updateUser };
};

export default useEditUser;