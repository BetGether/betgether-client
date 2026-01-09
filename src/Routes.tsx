import { useRoutes } from "react-router-dom";

import GetherJoinPage from "@/pages/gether/GetherJoinPage";
import LandingPage from "@/pages/landing/landingPage";
import GetherPage from "@/pages/gether/GetherPage";
import MainPage from "@/pages/main/MainPage";
import GetherInvitePage from "./pages/gether/GetherInvitePage";
import GetherSettingPage from "./pages/gether/GetherSettingPage";
import ErrorFallbackPage from "./pages/ErrorFallbackPage";
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
    //TODO : 에러 Fallback은 디버깅용 삭제
    {
      path: "/error",
      element: <ErrorFallbackPage />,
    },
    { path: "/gether/:getherId/setting", element: <GetherSettingPage /> },
    { path: "/invite/:inviteCode", element: <GetherInvitePage /> },
    {
      path: "/gethers/search",
      element: <SearchPage />,
    },
  ]);

  return elements;
}
