import { NEXT_PUBLIC_BACKEND_API_URL } from "@/env";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const toast = useToast();

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
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, formData);
      if (response.status !== 200) {
        console.error("ログインに失敗しました");
      } else {
        //成功したら、トークンをクッキーとセッションストレージに保存
        document.cookie = `token=${response.data.access_token}`;
        sessionStorage.setItem("token", response.data.access_token);
        toast({
          title: "ログインしました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "ログインできませんでした",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};

export default useLogin;