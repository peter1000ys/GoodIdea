import { Helmet } from "react-helmet-async";
import Header from "../components/common/Header";

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>로그인페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />
        로그인페이지
      </div>
    </>
  );
}

export default LoginPage;
