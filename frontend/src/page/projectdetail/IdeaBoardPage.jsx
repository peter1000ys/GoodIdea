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
          <Sticker delay={100} />
          <Sticker delay={200} />
          <Sticker delay={300} />
        </div>
        <div className="flex justify-center items-center flex-row space-x-10">
          <Sticker delay={400} />
          <Sticker delay={500} />
          <Sticker delay={600} />
        </div>
        <div
          class="tenor-gif-embed"
          data-postid="14883618"
          data-share-method="host"
          data-aspect-ratio="0.75"
          data-width="100%"
        >
          <a href="https://tenor.com/view/konoshuba-aqua-dance-gif-14883618">
            Konoshuba Aqua Sticker
          </a>
          from{" "}
          <a href="https://tenor.com/search/konoshuba-stickers">
            Konoshuba Stickers
          </a>
        </div>{" "}
        <script
          type="text/javascript"
          async
          src="https://tenor.com/embed.js"
        ></script>
      </div>
    </>
  );
}

export default IdeaBoardPage;
