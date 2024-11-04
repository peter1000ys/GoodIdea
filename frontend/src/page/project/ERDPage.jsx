import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";

const ERDDrawing = React.lazy(() => import("../../components/erd/ERDDrawing"));
// import ERDDrawing from "../../components/erd/ERDDrawing";

function ERDPage() {
  return (
    <>
      <Helmet>
        <title>ERD페이지</title>
      </Helmet>
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 flex">
          <Suspense fallback={<div>로딩 중...</div>}>
            <ERDDrawing />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default ERDPage;
