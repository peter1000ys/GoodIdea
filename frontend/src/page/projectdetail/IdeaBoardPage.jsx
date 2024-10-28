import { Helmet } from "react-helmet-async";
import Header from "../../components/common/Header";

function IdeaBoardPage() {
  return (
    <>
      <Helmet>
        <title> 아이디어보드 페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />
      </div>
      아이디어보드 페이지
    </>
  );
}

export default IdeaBoardPage;
