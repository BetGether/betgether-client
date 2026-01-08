import { useRoutes } from "react-router-dom";
import GetherPage from "./pages/GetherPage";

export default function Router() {
  const elements = useRoutes([
    {
      path: "/gether",
      element: <GetherPage />,
    },
  ]);

  return elements;
}
