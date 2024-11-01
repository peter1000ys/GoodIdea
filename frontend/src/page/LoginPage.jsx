import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 토큰 추출
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // 토큰을 세션 스토리지에 저장
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      // 메인 페이지로 리디렉트
      navigate("/");
    } else {
      console.log("리디렉트된 URL에 토큰이 없습니다.");
    }
  }, [navigate]);
  return (
    <>
      <h1>Login Page</h1>
    </>
  );
};

export default LoginPage;
