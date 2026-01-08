// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/main/MainPage";


export const router = createBrowserRouter([
  {
    path: "/gethers/my",
    element: <MainPage />
  },
//   {
//     path: "/ranking",
//     element: <RankingPage />
//   },
//   {
//     path: "/search",
//     element: <SearchPage />
//   },
//   {
//     path: "/auth/login",
//     element: <LandingPage />
//   },

]);