import { RouteObject } from "react-router-dom";
import Auth from "@/pages/auth";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Knowledge from "./pages/knowledge";
import DocEditor from "./pages/editor";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/wiki",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Knowledge />,
      },
    ],
  },
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
  {
    path: "docs/:blockId",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <DocEditor />,
      },
    ],
  },
];
export default routes;
