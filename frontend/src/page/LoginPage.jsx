import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const setLogin = useUserStore((state) => state.setLogin);

  useEffect(() => {
    const handleLogin = async () => {
      // URL에서 토큰 추출
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("accessToken");
      const refreshToken = urlParams.get("refreshToken");
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        // 인증된 axios 인스턴스 생성
        try {
          // 프로필 정보 요청
          const profileResponse = await axios.get(
            `https://goodidea.world/api/user-service/api/v1/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log("정보:", profileResponse.data.data);
          const userInfo = profileResponse.data.data;
          setLogin(userInfo); // userInfo 저장

          // 메인 페이지로 리디렉트
          navigate("/projectlist");
        } catch (error) {
          console.error("프로필 정보 가져오기 실패:", error);
        }
      } else {
        console.log("리디렉트된 URL에 토큰이 없습니다.");
      }
    };
    handleLogin();
  }, [navigate, setLogin]);

  return <>Login Page</>;
};

export default LoginPage;
