import { useRoutes } from "react-router-dom";
import GetherJoinPage from "./pages/GetherJoinPage";

export default function Router() {
  const elements = useRoutes([
    {
      path: "/gether/join/:getherId",
      element: <GetherJoinPage />,
    },
  ]);

  return elements;
}
