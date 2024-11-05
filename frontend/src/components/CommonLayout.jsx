import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Nav from "./common/Nav";
import Header from "./common/Header";

function CommonLayout() {
  const [isproject, setisproject] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (params?.id) setisproject(true);
    else setisproject(false);
  }, [params]);

  return (
    <div className="flex min-h-screen min-w-screen">
      {isproject && <Nav />}

      {/* Main Content */}
      <main className={`flex-1 flex flex-col ${isproject ? "ml-64" : "ml-0"}`}>
        {/* 자식 컴포넌트를 렌더링 */}
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default CommonLayout;
