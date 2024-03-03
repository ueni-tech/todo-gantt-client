import { NEXT_PUBLIC_BACKEND_API_URL } from "@/env";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const useRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/auth/register`, formData);
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
    formData,
    handleChange,
    handleSubmit
  };
};

export default useRegister;