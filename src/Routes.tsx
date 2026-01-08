import { useRoutes } from "react-router-dom";
import GetherPage from "./pages/GetherPage";
import LandingPage from "./pages/landing/landingPage";

export default function Router() {
  const elements = useRoutes([
    {
      path: "/gether",
      element: <GetherPage />,
    },
    {
      path: "/gethers/my",
      element: <LandingPage />,
    },
  ]);

  return elements;
}
