import React, { Suspense } from "react";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LiveblocksProvider } from "@liveblocks/react";
import { createClient } from "@liveblocks/client"; // @liveblocks/client에서 createClient 가져오기
import CommonLayout from "./components/CommonLayout";

// default 페이지
import MainPage from "./page/MainPage";
import NotFoundPage from "./page/NotFoundPage";
import LoginPage from "./page/LoginPage";
import liveblocksClient from "../liveblocks.config"; // Liveblocks 클라이언트 import

import LoadingSpinner from "./components/common/LoadingSpinner";

// 프로젝트 정보
const ProjectListPage = React.lazy(() => import("./page/ProjectListPage"));
const ProjectEssentialPage = React.lazy(() =>
  import("./page/project/ProjectEssentialPage")
);

// 환경변수 확인
console.log("Public Key from env:", import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY);

const client = createClient({
  publicApiKey:
    "pk_dev_nJXrR6Wtow_BqktuYQvAWmBdZ7ybi5UK7O-0_Ix1DlBiVGTSKzWxCSZeSDT5oWsh",
});
// 산출물 목록들 페이지
const MindMapPage = React.lazy(() => import("./page/project/MindMapPage"));
const IdeaBoardPage = React.lazy(() => import("./page/project/IdeaBoardPage"));
const ProposalPage = React.lazy(() => import("./page/project/ProposalPage"));
const ApiSpecificationPage = React.lazy(() =>
  import("./page/project/ApiSpecificationPage")
);
const ERDPage = React.lazy(() => import("./page/project/ERDPage"));
const RequirementsSpecificationPage = React.lazy(() =>
  import("./page/project/RequirementsSpecificationPage")
);
const FlowChartPage = React.lazy(() => import("./page/project/FlowChartPage"));

function App() {
  return (
    <HelmetProvider>
      <LiveblocksProvider publicApiKey="pk_dev_nJXrR6Wtow_BqktuYQvAWmBdZ7ybi5UK7O-0_Ix1DlBiVGTSKzWxCSZeSDT5oWsh">
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="" element={<CommonLayout />}>
                {/* 메인 페이지 */}
                <Route index element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* 프로젝트 목록 페이지*/}
                <Route path="/projectList" element={<ProjectListPage />} />

                <Route path="/project/:id">
                  {/* 프로젝트 기본 정보 페이지 */}
                  <Route index element={<ProjectEssentialPage />} />

                  {/* 마인드맵 페이지 */}
                  <Route
                    path="/project/:id/mindmap"
                    element={<MindMapPage />}
                  />

                  {/* 아이디어보드페이지 */}
                  <Route
                    path="/project/:id/ideaboard"
                    element={<IdeaBoardPage />}
                  />

                  {/* 기획서 페이지 */}
                  <Route
                    path="/project/:id/idea/:ideaId/proposal"
                    element={<ProposalPage />}
                  />

                  {/* api명세서 페이지 */}
                  <Route
                    path="/project/:id/idea/:ideaId/apispecification"
                    element={<ApiSpecificationPage />}
                  />

                  {/* ERD페이지 */}
                  <Route
                    path="/project/:id/idea/:ideaId/erd"
                    element={<ERDPage />}
                  />

                  {/* 요구사항 명세서 페이지 */}
                  <Route
                    path="/project/:id/idea/:ideaId/requirementsspecification"
                    element={<RequirementsSpecificationPage />}
                  />

                  {/* 플로우차트 페이지 */}
                  <Route
                    path="/project/:id/idea/:ideaId/flowchart"
                    element={<FlowChartPage />}
                  />
                </Route>
              </Route>

              {/* 404 not found */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LiveblocksProvider>
    </HelmetProvider>
  );
}

export default App;
