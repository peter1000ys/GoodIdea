import { Helmet } from "react-helmet-async";
import RequirementsTable from "../../components/requirementsspecification/RequirementsTable";

function RequirementsSpecificationPage() {
  return (
    <>
      <Helmet>
        <title>요구사항명세서페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <RequirementsTable />
      </div>
    </>
  );
}

export default RequirementsSpecificationPage;
