import { Helmet } from "react-helmet-async";
import Header from "../components/common/Header";

function MainPage() {
  // 리다이렉트 URL 설정
  const handleGitLabLogin = () => {
    window.location.href =
      "https://lab.ssafy.com/oauth/authorize?client_id=423f3efe4f264ff88416dc5ad049498edfaeaf5a68dcdb835ee4ce5b0bf48f32&redirect_uri=http://oracle1.mypjt.xyz/api/v1/hello/callback&response_type=code&scope=read_user%20api&state=random_state_string";
  };

  return (
    <>
      <Helmet>
        <title>메인페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <div>
          메인페이지
          {/* 버튼 추가 */}
          <button onClick={handleGitLabLogin}>GitLab로 로그인</button>
        </div>
        <Header content="관통 프로젝트" />
      </div>
      메인페이지
    </>
  );
}

export default MainPage;
