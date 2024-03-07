import { NEXT_PUBLIC_BACKEND_API_URL } from "@/env";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();
  const toast = useToast();
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        console.error("ログアウトに失敗しました");
      } else {
        //成功したら、クッキーとセッションストレージのトークンを削除
        document.cookie = `token=; max-age=0`;
        sessionStorage.removeItem("token");
        toast({
          title: "ログアウトしました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/login");
      }
    } catch (error) {
      toast({
        title: "ログアウトできませんでした",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return {
    handleLogout
  };
};

export default useLogout;