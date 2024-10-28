import { Helmet } from "react-helmet-async";
import Header from "../../components/common/Header";

function ProposalPage() {
  return (
    <>
      <Helmet>
        <title>기획서페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />

        <div>프로젝트 개요</div>
      </div>
    </>
  );
}

export default ProposalPage;
