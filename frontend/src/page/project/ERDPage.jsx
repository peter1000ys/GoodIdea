import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ERDDrawing = React.lazy(() => import("../../components/erd/ERDDrawing"));

/*  
  *
  1. z-index 빵빵하게 준 가이드 페이지 작성해서 유저가 사용법 알 수 있도록 추가 필요
  2. 툴팁 만들어서 대충 사용법 알 수 있도록 수정 필요
  */

function ERDPage() {
  return (
    <>
      <Helmet>
        <title>ERD페이지</title>
      </Helmet>
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 flex">
          <Suspense fallback={<LoadingSpinner />}>
            <ERDDrawing />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default ERDPage;
