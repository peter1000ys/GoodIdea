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
              <Route
                path="/projectdetail/:id/apispecification"
                element={<ApiSpecificationPage />}
              />
              <Route
                path="/projectdetail/:id/brainstorming"
                element={<BrainStormingPage />}
              />
              <Route path="/projectdetail/:id/erd" element={<ERDPage />} />
              <Route
                path="/projectdetail/:id/ideaboard"
                element={<IdeaBoardPage />}
              />
              <Route
                path="/projectdetail/:id/projectessential"
                element={<ProjectEssentialPage />}
              />
              <Route
                path="/projectdetail/:id/proposal"
                element={<ProposalPage />}
              />
              <Route
                path="/projectdetail/:id/requirementsspecification"
                element={<RequirementsSpecificationPage />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
