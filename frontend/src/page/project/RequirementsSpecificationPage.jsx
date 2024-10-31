import { Helmet } from "react-helmet-async";
import Header from "../../components/common/Header";

function RequirementsSpecificationPage() {
  return (
    <>
      <Helmet>
        <title>요구사항명세서페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />
        요구사항명세서페이지
      </div>
    </>
  );
}

export default RequirementsSpecificationPage;
