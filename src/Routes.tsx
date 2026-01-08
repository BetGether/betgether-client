import { useRoutes } from "react-router-dom";
import GetherJoinPage from "./pages/GetherJoinPage";
import LandingPage from "./pages/landing/landingPage";

export default function Router() {
  const elements = useRoutes([
    {
      path: "/gether/join/:getherId",
      element: <GetherJoinPage />,
    },
    {
      path: "/gethers/my",
      element: <LandingPage />,
    },
  ]);

  return elements;
}
