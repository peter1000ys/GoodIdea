import { Helmet } from "react-helmet-async";
import Header from "../components/common/Header";

function MainPage() {
  return (
    <>
      <Helmet>
        <title>메인페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />
      </div>
      메인페이지
    </>
  );
}

export default MainPage;
