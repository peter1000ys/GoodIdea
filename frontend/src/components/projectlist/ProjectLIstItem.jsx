import { useNavigate } from "react-router-dom";
import DefaultButton from "../common/DefaultButton";

function ProjectListItem({ project }) {
  const navigate = useNavigate();
  const navigateDetail = () => {
    // navigate to detail page
    navigate(`/projectdetail/${project.project_id}`);
  };
  return (
    <>
      <div key={project.id} className="flex items-center justify-between mb-4">
        {/* 좌측 */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={navigateDetail}
        >
          <div className="w-10 h-10 rounded-md bg-gray-200 items-center justify-center flex font-bold text-2xl">
            {project?.name[0]}
          </div>
          <div className="flex flex-col hover:underline">
            <span className="font-thin text-lg">
              {project.name} /{" "}
              <span className="font-medium"> {project.gitlab_name}</span>
            </span>
            <span className="text-sm text-gray-500">{project.description}</span>
          </div>
        </div>

        {/* 우측 */}
        <div className="flex items-center gap-4">
          <span
            onClick={() => window.location.replace(project.gitlab_url)}
            className="text-sm text-gray-500 cursor-pointer hover:underline"
          >
            Go to Gitlab
          </span>
        </div>
      </div>
    </>
  );
}

export default ProjectListItem;
