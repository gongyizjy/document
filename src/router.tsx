import { RouteObject } from "react-router-dom";
import Auth from "@/pages/auth";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

const routes: RouteObject[] = [
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];
export default routes;
