import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "./providers/RouterProvider";
import "./index.css";
import { QueryProvider } from "./providers/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  </React.StrictMode>
);
