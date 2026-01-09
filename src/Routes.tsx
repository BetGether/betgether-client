import { useRoutes } from "react-router-dom";

import GetherJoinPage from "@/pages/gether/GetherJoinPage";
import LandingPage from "@/pages/landing/landingPage";
import GetherPage from "@/pages/gether/GetherPage";
import MainPage from "@/pages/main/MainPage";
import SearchPage from "@/pages/search/SearchPage";

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
      path: "/login",
      element: <LandingPage />,
    },
    {
      path: "/gethers/my",
      element: <MainPage />,
    },
    {
      path: "/gethers/search",
      element: <SearchPage/>,
    },
  ]);

  return elements;
}
