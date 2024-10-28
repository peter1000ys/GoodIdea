import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./common/Nav";

function CommonLayout() {
  const localtion = useLocation();
  const [isProjectDetail, setisProjectDetail] = useState(false);
  useEffect(() => {
    setisProjectDetail(location.pathname.includes("projectdetail"));
  }, [localtion.pathname]);

  return (
    <div className="flex min-h-screen min-w-screen">
      {isProjectDetail && <Nav />}

      {/* Main Content */}
      <main className={`flex-1 ${isProjectDetail ? "ml-64" : "ml-0"}`}>
        {/* 자식 컴포넌트를 렌더링 */}
        <Outlet />
      </main>
    </div>
  );
}

export default CommonLayout;
