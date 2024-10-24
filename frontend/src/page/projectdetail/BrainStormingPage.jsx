import { Helmet } from "react-helmet-async";
import MindMap from "../../components/brainstorming/MindMap";

function BrainStormingPage() {
  return (
    <>
      <Helmet>
        <title>브레인스토밍페이지</title>
      </Helmet>
      브레인스토밍페이지
      <MindMap />
    </>
  );
}

export default BrainStormingPage;
