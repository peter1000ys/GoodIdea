import React, { Suspense } from "react";

const ERDDrawing = React.lazy(() => import("../../components/erd/ERDDrawing"));
// import ERDDrawing from "../../components/erd/ERDDrawing";

const ModalERD = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 flex">
          <Suspense fallback={<div>로딩 중...</div>}>
            <ERDDrawing />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ModalERD;
