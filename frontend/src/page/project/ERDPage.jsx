import Header from "../../components/common/Header";
import { Helmet } from "react-helmet-async";

function ERDPage() {
  return (
    <>
      <Helmet>
        <title>ERD페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />
        ERD페이지
      </div>
    </>
  );
}

export default ERDPage;
