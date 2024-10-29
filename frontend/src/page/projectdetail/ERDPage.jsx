import Header from "../../components/common/Header";
import { Helmet } from "react-helmet-async";
import { ERDDrawing } from "../../components/erd/ERDDrawing";

function ERDPage() {
  return (
    <>
      <Helmet>
        <title>ERD페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />
      </div>
      <div className="w-full h-[700px]">
        <ERDDrawing />
      </div>
    </>
  );
}

export default ERDPage;
