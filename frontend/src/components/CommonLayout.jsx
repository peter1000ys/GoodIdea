import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./common/Nav";

function CommonLayout() {
  return (
    <div className="flex min-h-screen min-w-screen">
      <Nav />

      {/* Main Content */}
      <main className="flex-1">
        {/* 자식 컴포넌트를 렌더링 */}
        <Outlet />
      </main>
    </div>
  );
}

export default CommonLayout;
