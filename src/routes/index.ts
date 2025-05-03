import App from "../App.tsx";
import ProjectFive from "../pages/ProjectFive.tsx";
import ProjectFour from "../pages/ProjectFour.tsx";
import ProjectHeader from "../pages/Project.tsx";
import ProjectOne from "../pages/ProjectOne.tsx";
import ProjectSeven from "../pages/ProjectSeven.tsx";
import ProjectSix from "../pages/ProjectSix.tsx";
import ProjectThree from "../pages/ProjectThree.tsx";
import ProjectTwo from "../pages/ProjectTwo.tsx";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
	{
		index: true,
		Component: App,
	},
	{
		path: "project",
		Component: ProjectHeader,
		children: [
			{ path: "one", Component: ProjectOne },
			{ path: "two", Component: ProjectTwo },
			{ path: "three", Component: ProjectThree },
			{ path: "four", Component: ProjectFour },
			{ path: "five", Component: ProjectFive },
			{ path: "six", Component: ProjectSix },
			{ path: "seven", Component: ProjectSeven },
		],
	},
]);

export default router;
