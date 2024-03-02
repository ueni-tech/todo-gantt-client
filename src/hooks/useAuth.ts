import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    exp: 0,
    username: "",
  });

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
        return;
        // router.push("/user/login");
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
        return;
        // router.push("/user/login");
      }
      //5: トークンが有効な場合、ユーザー情報を取得する
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_API_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        return;
        // router.push("/user/login");
      }
      //6: ユーザー情報をstateに保存する
      setLoginUser({
        email: data.email,
        exp: exp,
        username: data.username,
      });
    }

    checkToken();
  }, [router]);

  return loginUser;
};

export default useAuth;