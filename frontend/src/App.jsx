import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";
import LoginPage from "./page/LoginPage";
import NotFoundPage from "./page/NotFoundPage";
import CommonLayout from "./components/CommonLayout";
import ApiSpecificationPage from "./page/projectdetail/ApiSpecificationPage";
import BrainStormingPage from "./page/projectdetail/BrainStormingPage";
import ERDPage from "./page/projectdetail/ERDPage";
import IdeaBoardPage from "./page/projectdetail/IdeaBoardPage";
import ProjectEssentialPage from "./page/projectdetail/ProjectEssentialPage";
import ProposalPage from "./page/projectdetail/ProposalPage";
import RequirementsSpecificationPage from "./page/projectdetail/RequirementsSpecificationPage";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<CommonLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/projectdetail/:id">
              {/* 프로젝트 기본 정보 페이지 */}
              <Route index element={<ProjectEssentialPage />} />

              {/* api명세서 페이지 */}
              <Route
                path="/projectdetail/:id/apispecification"
                element={<ApiSpecificationPage />}
              />

              {/* 브레인스토밍 페이지 */}
              <Route
                path="/projectdetail/:id/brainstorming"
                element={<BrainStormingPage />}
              />

              {/* ERD페이지 */}
              <Route path="/projectdetail/:id/erd" element={<ERDPage />} />
              <Route
                path="/projectdetail/:id/ideaboard"
                element={<IdeaBoardPage />}
              />

              {/* 기획서 페이지 */}
              <Route
                path="/projectdetail/:id/proposal"
                element={<ProposalPage />}
              />

              {/* 요구사항 명세서 페이지 */}
              <Route
                path="/projectdetail/:id/requirementsspecification"
                element={<RequirementsSpecificationPage />}
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
