import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeRoute from "./src/routes/Home";
import ExternalPersistenceExampleRoute from "./src/routes/examples/ExternalPersistence";
import HorizontalExampleRoute from "./src/routes/examples/Horizontal";
import PersistenceExampleRoute from "./src/routes/examples/Persistence";
import CollapsibleExampleRoute from "./src/routes/examples/Collapsible";
import VerticalExampleRoute from "./src/routes/examples/Vertical";
import EndToEndTestingRoute from "./src/routes/EndToEndTesting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
  },
  {
    path: "/examples/external-persistence",
    element: <ExternalPersistenceExampleRoute />,
  },
  {
    path: "/examples/horizontal",
    element: <HorizontalExampleRoute />,
  },
  {
    path: "/examples/persistence",
    element: <PersistenceExampleRoute />,
  },
  {
    path: "/examples/collapsible",
    element: <CollapsibleExampleRoute />,
  },
  {
    path: "/examples/vertical",
    element: <VerticalExampleRoute />,
  },

  // Special route used by e2e tests
  {
    path: "/__e2e",
    element: <EndToEndTestingRoute />,
  },
]);

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
