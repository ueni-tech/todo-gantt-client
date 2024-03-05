import { NEXT_PUBLIC_BACKEND_API_URL } from "@/env";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InputsType } from "../../types/types";

const useRegister = () => {
  const router = useRouter();

  const handleSubmit = async (data: InputsType) => {
    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/auth/register`, data);
      if (response.status !== 201) {
        console.error("ログインに失敗しました");
      } else {
        //成功したら、トークンをクッキーとセッションストレージに保存
        document.cookie = `token=${response.data.access_token}`;
        sessionStorage.setItem("token", response.data.access_token);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleSubmit
  };
};

export default useRegister;