import { Helmet } from "react-helmet-async";
import Header from "../components/common/Header";

function ProjectListPage() {
  return (
    <>
      <Helmet>
        <title>프로젝트 목록 페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header />
        프로젝트 목록 페이지
      </div>
    </>
  );
}

export default ProjectListPage;
