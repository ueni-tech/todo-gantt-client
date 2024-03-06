import { NEXT_PUBLIC_BACKEND_API_URL } from "@/env";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserType } from "../../types/types";
import { useAtom } from 'jotai';
import { userAtom } from "@/state/userAtom";

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [, setLoginUser] = useAtom(userAtom);

  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {

      //1:クッキーからトークンを取得する
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      //2:トークンがあるかどうか
      if (!token) {
        router.push("/login");
        return;
      }
      //3: トークンがある場合、トークンの有効性を確認する
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const payload = JSON.parse(jsonPayload);
      const exp = payload.exp;

      //4: トークンの有効期限を確認する
      if (exp < Date.now() / 1000) {

        router.push("/login");
        return;
      }

      //5:  トークンが有効な場合、トークンからユーザー情報を取得する
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/auth/me`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        router.push("/login");
      } else {
        setIsLogin(true);
        setLoginUser(response.data);
      }
    }
    checkToken();
  }, [router]);

  return {isLogin};
};

export default useAuth;