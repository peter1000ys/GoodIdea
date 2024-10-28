import { Helmet } from "react-helmet-async";
import Header from "../../components/common/Header";
import DefaultButton from "../../components/common/DefaultButton";

function ProposalPage() {
  return (
    <>
      <Helmet>
        <title>프로젝트 개요</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />

        <div className="flex-1 items-center justify-center flex">CRDT 영역</div>
        <div>
          <div className="float-end space-x-3 p-2">
            <DefaultButton text="팀명 수정" />
            <DefaultButton text="저장" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProposalPage;
