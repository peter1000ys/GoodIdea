import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Nav from "./common/Nav";

function CommonLayout() {
  const [isproject, setisproject] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (params?.id) setisproject(true);
  }, [params]);

  return (
    <div className="flex min-h-screen min-w-screen">
      {isproject && <Nav />}

      {/* Main Content */}
      <main className={`flex-1 ${isproject ? "ml-64" : "ml-0"}`}>
        {/* 자식 컴포넌트를 렌더링 */}
        <Outlet />
      </main>
    </div>
  );
}

export default CommonLayout;
