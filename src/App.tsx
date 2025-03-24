import { useRoutes } from "react-router-dom";
import routes from "./router";

export default function App() {
  const routeElement = useRoutes(routes);

  return routeElement;
}
