import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./common/Header";

function CommonLayout() {
  return (
    <div className="flex">
      {/* Header - 세로로 길게 배치 */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* 자식 컴포넌트를 렌더링 */}
        <Outlet />
      </main>
    </div>
  );
}

export default CommonLayout;
