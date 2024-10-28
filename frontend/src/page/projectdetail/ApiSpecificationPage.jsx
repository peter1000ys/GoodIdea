import Header from "../../components/common/Header";
import { Helmet } from "react-helmet-async";

function ApiSpecificationPage() {
  return (
    <>
      <Helmet>
        <title>api명세서페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />
      </div>
      api명세서페이지
    </>
  );
}

export default ApiSpecificationPage;
