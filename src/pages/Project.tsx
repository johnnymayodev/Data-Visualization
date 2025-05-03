import "@/styles/Project.css";

import { Outlet, useLocation, useNavigate } from "react-router";

function ProjectHeader() {
	const navigate = useNavigate();
	const path = useLocation();

	return (
		<>
			<div className="project-header">
				<h1>Project Header</h1>
				<span>
					Only what is below the red line is the project. Viewing project{" "}
					{path.pathname.split("/").pop()}
				</span>
				<button onClick={() => navigate("/")}>Back</button>
			</div>
			<Outlet />
		</>
	);
}

export default ProjectHeader;
