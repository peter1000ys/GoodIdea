import { useState } from "react";
import Divier from "../common/Divier";
import ModalPlanning from "./ModalPlanning";
import ModalAPISpec from "./ModalRequirementSpec";
import ModalERD from "./ModalERD";
import ModalFlowChart from "./ModalFlowChart";
import ModalRequirementSpec from "./ModalRequirementSpec";

// 각 메뉴별 내용을 표시할 컴포넌트

const StickerModal = ({ closeModal, selectedSticker }) => {
  const [selectedMenu, setSelectedMenu] = useState("Planning");

  const renderContent = () => {
    switch (selectedMenu) {
      case "Planning":
        return <ModalPlanning />;
      case "RequirementSpec":
        return <ModalRequirementSpec />;
      case "APISpec":
        return <ModalAPISpec />;
      case "ERD":
        return <ModalERD />;
      case "FlowChart":
        return <ModalFlowChart />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="w-[95vw] h-[93vh] p-4 relative rounded-lg flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 메뉴 버튼 */}
        <div className="flex justify-around text-black">
          <button
            onClick={() => setSelectedMenu("Planning")}
            className="flex-1 p-2"
            style={{
              backgroundColor:
                selectedMenu === "Planning"
                  ? selectedSticker.darkColor
                  : selectedSticker.color,
            }}
          >
            기획서
          </button>
          <button
            onClick={() => setSelectedMenu("RequirementSpec")}
            className="flex-1 p-2"
            style={{
              backgroundColor:
                selectedMenu === "RequirementSpec"
                  ? selectedSticker.darkColor
                  : selectedSticker.color,
            }}
          >
            요구사항 명세서
          </button>
          <button
            onClick={() => setSelectedMenu("APISpec")}
            className="flex-1 p-2"
            style={{
              backgroundColor:
                selectedMenu === "APISpec"
                  ? selectedSticker.darkColor
                  : selectedSticker.color,
            }}
          >
            API 명세서
          </button>
          <button
            onClick={() => setSelectedMenu("ERD")}
            className="flex-1 p-2"
            style={{
              backgroundColor:
                selectedMenu === "ERD"
                  ? selectedSticker.darkColor
                  : selectedSticker.color,
            }}
          >
            ERD
          </button>
          <button
            onClick={() => setSelectedMenu("FlowChart")}
            className="flex-1 p-2"
            style={{
              backgroundColor:
                selectedMenu === "FlowChart"
                  ? selectedSticker.darkColor
                  : selectedSticker.color,
            }}
          >
            FLOWCHART
          </button>
        </div>
        <Divier />
        {/* 선택된 메뉴 내용 */}
        <div
          className="w-full h-full overflow-auto"
          style={{ backgroundColor: selectedSticker.color }}
        >
          {renderContent()}
        </div>
        <button
          className="absolute text-3xl top-16 right-7 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <big>&times;</big>
        </button>
      </div>
    </div>
  );
};

export default StickerModal;
