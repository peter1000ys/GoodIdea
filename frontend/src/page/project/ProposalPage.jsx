// ProposalPage.jsx
import React from "react";
import { RoomProvider } from "@liveblocks/react";
import { useLocation } from "react-router-dom";
import ProposalEditor from "./ProposalEditor"; // ProposalEditor 컴포넌트 import
import { ClientSideSuspense } from "@liveblocks/react";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Room = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <RoomProvider id={`proposal-room-${pathname}`}>
      <ClientSideSuspense fallback={<LoadingSpinner message={"Wait!!"} />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default function ProposalPage() {
  return (
    // RoomProvider로 ProposalEditor를 감싸서 Liveblocks 방 기능을 제공합니다.
    <>
      <Helmet>
        <title>기획서</title>
      </Helmet>
      <Room>
        <ProposalEditor />
      </Room>
    </>
  );
}
