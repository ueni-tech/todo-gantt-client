import { NEXT_PUBLIC_BACKEND_API_URL } from "@/env";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InputsType } from "../../types/types";
import { useState } from "react";

const useRegister = () => {
  const router = useRouter();
  const [ apiErrors, setApiErrors ] = useState({
    name: [],
    email: [],
    password: [],
    password_confirmation: []
  });

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
    } catch (error: any) {
      console.error(error);
      setApiErrors(error.response.data);
    }
  };

  return {
    handleSubmit,
    apiErrors
  };
};

export default useRegister;