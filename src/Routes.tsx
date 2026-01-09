import { useRoutes } from "react-router-dom";
import GetherJoinPage from "@/pages/gether/GetherJoinPage";
import LandingPage from "@/pages/landing/landingPage";
import GetherPage from "@/pages/gether/GetherPage";

export default function Router() {
  const elements = useRoutes([
    {
      path: "/gether/join/:getherId",
      element: <GetherJoinPage />,
    },
    {
      path: "/gether/:getherId",
      element: <GetherPage />,
    },
    {
      path: "/gethers/my",
      element: <LandingPage />,
    },
  ]);

  return elements;
}
