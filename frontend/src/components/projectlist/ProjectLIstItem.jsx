import { useNavigate } from "react-router-dom";
import Divier from "../common/Divier";

function ProjectListItem({ project }) {
  const navigate = useNavigate();
  const navigateDetail = () => {
    // navigate to detail page
    navigate(`/project/${project.project_id}`);
  };
  return (
    <>
      <Divier />
      <div
        key={project.id}
        className="flex items-center justify-between my-2 px-4"
      >
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
        <div
          onClick={() => window.location.replace(project.gitlab_url)}
          className="flex items-center h-full hover:underline cursor-pointer"
        >
          <strong className="text-sm text-[rgb(59,130,246)]">
            Go to Gitlab
          </strong>
        </div>
      </div>
    </>
  );
}

export default ProjectListItem;
