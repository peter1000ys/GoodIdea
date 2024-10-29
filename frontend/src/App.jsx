import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";
import NotFoundPage from "./page/NotFoundPage";
import CommonLayout from "./components/CommonLayout";
import ApiSpecificationPage from "./page/projectdetail/ApiSpecificationPage";
import MindMapPage from "./page/projectdetail/MindMapPage";
import ERDPage from "./page/projectdetail/ERDPage";
import IdeaBoardPage from "./page/projectdetail/IdeaBoardPage";
import ProjectEssentialPage from "./page/projectdetail/ProjectEssentialPage";
import ProposalPage from "./page/projectdetail/ProposalPage";
import RequirementsSpecificationPage from "./page/projectdetail/RequirementsSpecificationPage";
import FlowChartPage from "./page/projectdetail/FlowChartPage";
import ProjectListPage from "./page/ProjectListPage";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<CommonLayout />}>
            {/* 메인 페이지 */}
            <Route index element={<MainPage />} />

            {/* 프로젝트 목록 페이지*/}
            <Route path="/projectList" element={<ProjectListPage />} />

            <Route path="/projectdetail/:id">
              {/* 프로젝트 기본 정보 페이지 */}
              <Route index element={<ProjectEssentialPage />} />

              {/* api명세서 페이지 */}
              <Route
                path="/projectdetail/:id/apispecification"
                element={<ApiSpecificationPage />}
              />

              {/* 마인드맵 페이지 */}
              <Route
                path="/projectdetail/:id/mindmap"
                element={<MindMapPage />}
              />

              {/* 아이디어보드페이지 */}
              <Route
                path="/projectdetail/:id/ideaboard"
                element={<IdeaBoardPage />}
              />

              {/* 프로젝트개요 페이지 */}
              <Route
                path="/projectdetail/:id/proposal"
                element={<ProposalPage />}
              />

              {/* ERD페이지 */}
              <Route path="/projectdetail/:id/erd" element={<ERDPage />} />

              {/* 요구사항 명세서 페이지 */}
              <Route
                path="/projectdetail/:id/requirementsspecification"
                element={<RequirementsSpecificationPage />}
              />

              {/* 플로우차트 페이지 */}
              <Route
                path="/projectdetail/:id/flowchart"
                element={<FlowChartPage />}
              />
            </Route>
          </Route>

          {/* 404 not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
