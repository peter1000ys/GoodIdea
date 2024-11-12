import React, { Suspense } from "react";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommonLayout from "./components/CommonLayout";

// default 페이지
import MainPage from "./page/MainPage";
import NotFoundPage from "./page/NotFoundPage";
import LoginPage from "./page/LoginPage";

import LoadingSpinner from "./components/common/LoadingSpinner";

// 프로젝트 정보
const ProjectListPage = React.lazy(() => import("./page/ProjectListPage"));
const ProjectEssentialPage = React.lazy(() =>
  import("./page/project/ProjectEssentialPage")
);

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
                <Route path="/project/:id/mindmap" element={<MindMapPage />} />

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
    </HelmetProvider>
  );
}

export default App;
