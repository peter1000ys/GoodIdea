// ProposalPage.jsx
import React from "react";
import { RoomProvider } from "@liveblocks/react";
import { useParams } from "react-router-dom";
import ProposalEditor from "./ProposalEditor"; // ProposalEditor 컴포넌트 import

export default function ProposalPage() {
  const { ideaId } = useParams(); // URL에서 ideaId 파라미터 가져오기

  return (
    // RoomProvider로 ProposalEditor를 감싸서 Liveblocks 방 기능을 제공합니다.
    <RoomProvider id={`proposal-room-${ideaId}`}>
      <ProposalEditor />
    </RoomProvider>
  );
}
