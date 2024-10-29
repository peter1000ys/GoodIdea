import { Helmet } from "react-helmet-async";
import Header from "../../components/common/Header";
import Sticker from "../../components/ideaboard/sticker";

function IdeaBoardPage() {
  return (
    <>
      <Helmet>
        <title> 아이디어보드 페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col space-y-10">
        <Header content="관통 프로젝트" />
        <div className="flex justify-center items-center flex-row space-x-10">
          <Sticker delay={0} />
          <Sticker delay={200} />
          <Sticker delay={400} />
        </div>
        <div className="flex justify-center items-center flex-row space-x-10">
          <Sticker delay={600} />
          <Sticker delay={800} />
          <Sticker delay={1000} />
        </div>
      </div>
    </>
  );
}

export default IdeaBoardPage;
