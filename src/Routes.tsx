import { useRoutes } from "react-router-dom";
import GetherJoinPage from "./pages/GetherJoinPage";
import LandingPage from "./pages/landing/landingPage";
import MainPage from "./pages/main/MainPage";

export default function Router() {
  const elements = useRoutes([
    {
      path: "/gether/join/:getherId",
      element: <GetherJoinPage />,
    },
    {
      path: "/login",
      element: <LandingPage />,
    },
    {
      path: "/gethers/my",
      element: <MainPage />,
    },
  ]);

  return elements;
}
